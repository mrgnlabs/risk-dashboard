import type { Metadata } from "next";
import "../styles/globals.css";
import { Layout } from "~/components/layout";

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
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
