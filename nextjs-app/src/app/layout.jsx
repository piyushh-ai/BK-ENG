import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import SessionProvider from "@/components/SessionProvider";

export const metadata = {
  title: "B.K Engineering",
  description: "Stock and Order Management System",
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
          <ThemeProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
