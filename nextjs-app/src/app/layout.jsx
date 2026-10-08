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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
