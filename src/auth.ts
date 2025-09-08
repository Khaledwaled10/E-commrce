import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
    pages:{
        signIn:'/auth/login'
    },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.Api}/auth/signin`, {
          method: "post",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const payload = await response.json();
       
        if (payload.message == "success") {
          const decoded: { id: string } = jwtDecode(payload?.token);
          return { 
            id: decoded.id,
             user: payload.user,
              token: payload.token };
        } else {
          throw new Error(payload.message || "wrong Credentails");
        }
      },
    }),
   Github({
      clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
   })
  ],
  callbacks:{
    async jwt({ token, user,account }) {
      if(user){
        if(account?.provider=='github'){
          token.user={
            name:user.name||'',
            email:user.email||'',
            image:user.image||'',
            role:'user'
          },token.token=user.token; 
        }else{
          token.user=user.user;
          token.token=user.token;
        }
      }
      return token;
    },
       async session({ session, token}) {
        session.user=token.user

      return session
    },

    },

};

