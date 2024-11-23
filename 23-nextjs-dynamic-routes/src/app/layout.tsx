import Team from "./@team/page";
import Visitor from "./@visitor/page";
import "./globals.css";

export default function RootLayout({
  children,
  team,
  visitor
}: Readonly<{
  children: React.ReactNode;
  team: React.ReactNode;
  visitor: React.ReactNode;
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


          <div className="flex flex-row justify-center items-center">
            {children}
          </div>

          <div className="mt-8 rounded-lg text-center flex-grow-2 flex flex-row justify-center items-center">
            {team}
            {visitor}
          </div>
        </div>
      </body>
    </html>
  );
}
