import { Metadata } from "next";

// SEO
export const metadata: Metadata = {
    title: "web developer portfolio",
    description: "web developer portfolio",
};

export default function Layout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>{children}</div>
}