import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-cyan-500 to-purple-500">

        <div className=" border-4 border-dashed border-black mx-auto mt-4 min-h-96 p-0">
          <h1 className="font-mono text-2xl border-b-4 border-dashed border-black ">
            &nbsp;This is&nbsp;
            <span className="text-yellow-500 mr-2 ml-2 font-bold">
              Root Layout -&gt;
            </span>
            /layout.tsx
          </h1>


          <div className="flex flex-row justify-center items-center min-h-96">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
