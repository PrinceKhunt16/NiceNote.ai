"use client"

import "./globals.css";
import { Catamaran } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { Toaster } from 'react-hot-toast';

const catamaran = Catamaran({
  variable: '--font-catamaran',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${catamaran.variable} antialiased`}
      >
         <Toaster
          position="top-center"
          containerStyle={{fontWeight: 600, fontFamily: "Catamaran"}}
          toastOptions={{
            duration: 3000,
            removeDelay: 1000
          }}
        />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
