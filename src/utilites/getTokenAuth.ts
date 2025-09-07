import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export default async function getTokenAuth() {
  const authtoken=(await cookies()).get('next-auth.session-token')?.value||(await cookies()).get('__Secure-next-auth.session-token')?.value
 const token=await decode({token:authtoken,secret:process.env.NEXTAUTH_SECRET!})
 
 return token?.token
}
