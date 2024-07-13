import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      // authorize if user is signed in
      authorized: async ({ token }) => {
        console.log(token)
        if (token) {
          console.log("User is signed in")
          return true
        }
        return false
      }
    },
  },
)

export const config = { matcher: ["/dashboard/:path*"] }