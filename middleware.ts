import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/chat/:path*',
    '/api/settings/:path*',
  ],
};

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: '/auth/login',
  },
});
