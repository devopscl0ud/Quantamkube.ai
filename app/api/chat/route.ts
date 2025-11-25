import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { streamGenerateContent, createKubernetesPrompt } from '@/lib/gemini';
import { handler as authHandler } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    // Get session
    const session = await getServerSession(authHandler);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse request
    const { message, chatId } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    let chat = await prisma.chat.findUnique({
      where: { id: chatId || '' },
      include: { messages: true },
    });

    // Create new chat if needed
    if (!chat) {
      const title = message.substring(0, 50);
      chat = await prisma.chat.create({
        data: {
          userId: user.id,
          title,
          messages: {
            create: { role: 'user', content: message },
          },
        },
        include: { messages: true },
      });
    } else {
      // Add user message to existing chat
      await prisma.message.create({
        data: {
          chatId: chat.id,
          role: 'user',
          content: message,
        },
      });
    }

    // Get context from previous messages
    const previousMessages = chat.messages
      .filter((m) => m.role === 'assistant')
      .slice(-4)
      .map((m) => `${m.role}: ${m.content}`);

    // Get Gemini API key (from user settings or env)
    const geminiKey = user.geminiApiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please set it in settings.' },
        { status: 500 }
      );
    }

    // Create prompt
    const prompt = createKubernetesPrompt(message, previousMessages);

    // Stream response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await streamGenerateContent(prompt, geminiKey);
          let fullResponse = '';

          for await (const chunk of response.stream) {
            const text = chunk.text();
            fullResponse += text;
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ text })}\n\n`));
          }

          // Save assistant message
          await prisma.message.create({
            data: {
              chatId: chat.id,
              role: 'assistant',
              content: fullResponse,
            },
          });

          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authHandler);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all chats for user
    const chats = await prisma.chat.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: { messages: { take: 1, orderBy: { createdAt: 'desc' } } },
    });

    return NextResponse.json({ chats });
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
