import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "../context/AuthProvider";
import React from "react";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/UserContext";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../lib/authOptions";
import SidebarLayout from "../components/layouts/sideBarLayout";

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

export const metadata: Metadata = {
  title: "CampusSync",
  description: "A full fledged educational institutions management software.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getServerSession(authOptions)) as Session & {
    user: { role?: string | null };
  };

  const shouldShowSidebar =
    session?.user &&
    session.user.role !== null &&
    session.user.role !== undefined;

  return (
    <html lang="en">
      <AuthProvider>
        <UserProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Toaster position="bottom-center" />
            {shouldShowSidebar ? (
              <SidebarLayout>{children}</SidebarLayout>
            ) : (
              children
            )}
          </body>
        </UserProvider>
      </AuthProvider>
    </html>
  );
}
