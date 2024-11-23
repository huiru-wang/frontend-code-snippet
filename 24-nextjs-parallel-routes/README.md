# 20-nextjs-basic

## 7. Parallel Routes

平行路由：文件夹以@开头，则认为是平行路由，此文件夹不会被识别为路由段。其子孙文件夹会被识别为路由段

```shell
app/
  |-- @team/
  |       |-- page.tsx 
  |-- @visitor/
  |       |-- page.tsx 
  |-- page.tsx 
  |-- layout.tsx
```

将@team和@visitor作为children组件，传给layout，执行渲染
```tsx
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
```