//app/layout.js
import { cookies } from "next/headers";
import "./globals.css";
import {AuthProvider} from './authProvider';
import { getMe } from "./api/api";
import { Analytics } from "@vercel/analytics/next"
export default async function RootLayout({ children }) {
  const res= (await getMe({Cookie: (await cookies()).toString()}))
  const user = await res.json()
  return (
    <html lang="vi">
      <body>
          <AuthProvider thisUser={user?.message? null : user}>
            {children}
          </AuthProvider>
          <Analytics />
      </body>
    </html>
  );
}
