import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import Wrapper from "@/app/_components/wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Admin Book Shop",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`h-ful font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <Wrapper>{children}</Wrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}