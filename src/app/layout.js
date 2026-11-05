import localFont from "next/font/local";
import DashboardShell from "@/components/DashboardShell";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Edgelink SEO Client Portal",
  description:
    "Client portal for SEO audits, website performance, reports, and notifications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
