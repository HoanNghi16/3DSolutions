//app/layout.js
import "./globals.css";
import {AuthProvider} from './authProvider';
import {Notification} from './notification'

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Notification>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Notification>
      </body>
    </html>
  );
}
