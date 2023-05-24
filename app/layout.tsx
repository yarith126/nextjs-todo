import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/todo">Todo</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
