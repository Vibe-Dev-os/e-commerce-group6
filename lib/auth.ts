import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Mock user database - replace with your actual database
// Password for all users: "password"
const users = [
  {
    id: "1",
    email: "admin@example.com",
    password: "password", // Plain text for testing
    name: "Admin User",
    role: "admin"
  },
  {
    id: "2", 
    email: "user@example.com",
    password: "password", // Plain text for testing
    name: "Regular User",
    role: "user"
  }
]

// Helper function to hash passwords (for development)
async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }

        const user = users.find(user => user.email === credentials.email)
        
        if (!user) {
          console.log("User not found:", credentials.email)
          return null
        }

        console.log("Found user:", user.email, "Role:", user.role)
        console.log("Checking password...")
        
        // Simple plain text comparison for development
        if (credentials.password !== user.password) {
          console.log("Password mismatch")
          return null
        }

        console.log("Password matched! Logging in as:", user.role)
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  secret: process.env.AUTH_SECRET,
}
