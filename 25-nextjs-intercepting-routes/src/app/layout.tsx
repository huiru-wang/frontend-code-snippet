'use client'
import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          {children}
          {modal}
        </div>
      </body>
    </html>
  );
}
