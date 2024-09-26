import { NextAuthOptions, SessionStrategy } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/src/db/db";
import type { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers:[
        
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "demo@demo.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                try {
                    console.log('Backend received email:', credentials.email);
                    console.log('Backend received password:', credentials.password);
                    // Find user by email
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });
            
                    // Log user details for debugging
                    console.log('User found:', user);
            
                    if (!user) {
                        console.log('No user found with this email');
                        throw new Error('No user found');
                    }
            
                    // Compare the password
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            
                    // Log password comparison result
                    console.log('Is password correct?', isPasswordCorrect);
            
                    if (!isPasswordCorrect) {
                        console.log('Incorrect password');
                        throw new Error('Incorrect Password');
                    }
            
                    return user;
            
                } catch (error: any) {
                    console.log('Error during authentication:', error);
                    throw new Error(error);
                }
            }
            
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
    callbacks:{
        async jwt({ token, user }) {
            if(user){
                token._id = user.user_id?.toString()
                token.role = user.role?.toString()
            }
            return token
        },
        async session({ session, token}: any) {
            if(token){
                session.user.user_id = token.user_id
                session.user.role = token.role
            }
            return session
        },
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt" as SessionStrategy
    },
    secret: process.env.NEXTAUTH_SECRET
}