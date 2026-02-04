//app/layout.js
import "./globals.css";
import {AuthProvider} from './authProvider';
import {GET} from './api/auth/me/route'
import { Analytics } from "@vercel/analytics/next"
export default async function RootLayout({ children }) {
  const data = await GET().then(res => res.json())
  console.log(data)
  const user = data?.message ? null : data.user //Nếu data trả về message thì user = null
  return (
    <html lang="vi">
      <body>
          <AuthProvider thisUser={user}>
            {children}
          </AuthProvider>
          <Analytics />
      </body>
    </html>
  );
}
