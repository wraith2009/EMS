// import GoogleProvider from 'next-auth/providers/google'
// import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import type { Adapter } from 'next-auth/adapters'
// import { SessionStrategy } from 'next-auth'
// import prisma from '../db/db'
// import { Session } from 'inspector/promises'

// export const authOptions = {
//     adapter: PrismaAdapter(prisma) as Adapter,
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID ?? '',
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
//         }),
//     ],

//     pages: {
//         signIn: '/signin',
//     },
    
//     session: {
//         strategy: 'jwt' as SessionStrategy,
//     },
//     callbacks: {
//         async jwt({ token }: any) {
//           return token
//         },
//         async session({ session, token }: any) {
//           const user = await prisma.user.findUnique({
//             where: {
//               id: token.sub,
//             },
//           })
//           if (token) {
//             session.accessToken = token.accessToken
//             session.user.id = token.sub
//           }
//           return session
//         },
//       },
// }