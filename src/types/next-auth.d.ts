import 'next-auth'

declare module 'next-auth' {
    interface User{
        user_id?: Int;
        role?: String
    }
    interface Session{
        user_id?: Int;
        role?: String
    } 
}