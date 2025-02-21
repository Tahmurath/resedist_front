'use client'

import en from "@/dictionaries/en/common.json"
import fa from "@/dictionaries/fa/common.json"
import "@/app/globals.css";

import {ReactNode, useState} from 'react';
import React from "react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog, DialogPanel, PopoverGroup} from "@headlessui/react";
import Link from "next/link";
import decodeJWT from "@/lib/jwt";
import { Toaster } from "@/components/ui/toaster"


export default function RootLayout({
children,
}: {
    children: React.ReactNode
}) {


    const jwtData = (jwt) => {
        return decodeJWT(jwt)
    }
    const saveLangToCookie = (lang) => {
        document.cookie = `lang=${lang}; max-age=${7 * 24 * 60 * 60}`;
    };

    const getLangFromCookie = () => {
        if (typeof window !== "undefined") {
            const cookies = document.cookie.split('; ');
            const langCookie = cookies.find((row) => row.startsWith('lang='));
            //console.info(tokenCookie.split('=')[1])
            return langCookie ? langCookie.split('=')[1] : "en";
        }
        return null
    };

    const [lang, setLang] = useState(getLangFromCookie());
    const dictionary = lang === "en" ? en : fa;

    const toggleLanguage = () => {

        setLang((prevLang) => (prevLang === "en" ? "fa" : "en"));
        saveLangToCookie(lang === "en" ? "fa" : "en")
    };

    //const dict = getDictionary("en")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <html lang="en">
        <body className="h-full">
        <div>
            <header className="bg-white">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6"/>
                        </button>
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-12">

                        <Link href={"/"} className="text-sm/6 font-semibold text-gray-900">
                            {dictionary.text.home}
                        </Link>

                        <Link href={"/dashboard"} className="text-sm/6 font-semibold text-gray-900">
                            {dictionary.text.dashboard}
                        </Link>
                        <a href="#" className="text-sm/6 font-semibold text-gray-900">
                            Marketplace
                        </a>
                        <a href="#" className="text-sm/6 font-semibold text-gray-900">
                            <button onClick={toggleLanguage}>
                                {lang === "en" ? "Switch to Persian" : "Switch to English"}
                            </button>
                        </a>
                    </PopoverGroup>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href={"/login"} className="text-sm/6 font-semibold text-gray-900">
                            {dictionary.text.login} <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-10"/>
                    <DialogPanel
                        className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6"/>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">

                                    <Link
                                        href={"/"}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        Features
                                    </Link>
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        Marketplace
                                    </a>
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        Company
                                    </a>
                                </div>
                                <div className="py-6">
                                    <Link
                                        href={"/login"}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {dictionary.text.login}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </div>
        <main className="py-10">
            {children}
            <Toaster />
        </main>

        </body>
        </html>
    )
}