import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { handler as authHandler } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const chat = await prisma.chat.findUnique({
      where: { id: params.id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });

    if (!chat || chat.userId !== user.id) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json({ messages: chat.messages });
  } catch (error) {
    console.error('Error fetching chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const chat = await prisma.chat.findUnique({
      where: { id: params.id },
    });

    if (!chat || chat.userId !== user.id) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    await prisma.chat.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Chat deleted' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { title } = await request.json();

    const chat = await prisma.chat.findUnique({
      where: { id: params.id },
    });

    if (!chat || chat.userId !== user.id) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    const updated = await prisma.chat.update({
      where: { id: params.id },
      data: { title },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating chat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
