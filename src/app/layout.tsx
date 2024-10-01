import type { Metadata } from "next";
import "../styles/globals.css";
import { Layout } from "~/components/layout";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Marginfi risk dashboard",
  description: "Marginfi risk dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
