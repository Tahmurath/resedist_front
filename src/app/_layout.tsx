import {getDictionary} from "@/app/[lang]/dictionaries";
import('../dictionaries/en/common.json')
import "./globals.css";

import { ReactNode } from 'react';

export default async function RootLayout({
children,
}: {
    children: React.ReactNode
}) {

    const dict = await getDictionary("en")
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}