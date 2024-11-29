import {getDictionary} from "@/app/[lang]/dictionaries";
import { ReactNode } from 'react';
import "./globals.css";


export default async function RootLayout({
children,
    params,
}: {
    children: ReactNode;
    params: { lang: string };
}) {

    const { lang } = params;
    const dict = await getDictionary(lang)
    return (
        <html lang="en">
        <body>{children}</body>
        {/*<button>{dict.text.save}</button>*/}
        </html>
    )
}