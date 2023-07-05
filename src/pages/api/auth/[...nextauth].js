import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const api = process.env.API_ENDPOINT;
        const res = await fetch(api + "login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const data = await res.json();
        if (!data.user) {
          throw new Error("Username-Or-Password-Is-Incorrect")
        }

        if (data.user.status === false) {
          throw new Error("Username-Is-Baned")
        }

        if (data) {
          return data;
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = user.accessToken
        token.user = user.user
        token.roleid = user.user.roleid
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    },

  },
  secret: process.env.NEXTAUTH_SECRET,
});
