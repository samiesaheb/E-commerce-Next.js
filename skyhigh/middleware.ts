// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server"; // Import NextRequest and NextResponse for explicit typing

export default withAuth(
  // The main middleware function
  function middleware(req: NextRequest) { // Explicitly type req as NextRequest for clarity
    // You can access the session here: req.nextauth.token
    // console.log("Middleware token:", req.nextauth.token);
    // You can also manipulate the request or return a response here if needed
    // e.g., return NextResponse.redirect(new URL('/some-other-page', req.url));
  },
  {
    callbacks: {
      authorized: ({ token, req }) => { // <--- ADD 'req' HERE IN THE DESTRUCTURING
        // Return `true` if the user is authorized, `false` otherwise
        // e.g., only allow authenticated users to '/dashboard'
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token; // Only authorized if a token exists
        }
        // If you have an '/auth/signin' route and want to redirect authenticated users
        // away from it, you could add:
        // if (req.nextUrl.pathname === '/auth/signin' && token) {
        //   return false; // Not authorized to access sign-in if already logged in
        // }
        return true; // Allow access to other pages by default
      },
    },
    pages: {
      signIn: '/auth/signin', // Redirect unauthorized users to your custom sign-in page
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/api/user/:path*'], // Apply middleware to these paths
};