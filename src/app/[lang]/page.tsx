import Link from "next/link";
import { getDictionary } from './dictionaries'
import { Button } from "@/components/ui/button"


export default async function Page({ params }:{params:any}  ) {
    const { lang } = params;
    const dict = await getDictionary(lang)

  return (
      <div>
          <Link href={"/"}>{dict.text.home}</Link> |
          <Link href={"/en"}>{dict.text.en}</Link> |
          <Link href={"/fa"}>{dict.text.fa}</Link>
          <h1>{dict.products.cart}</h1>
          <h1>app page.tsx {lang}</h1>
          <Button>Click me</Button>

      </div>
  )
}

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'fa' },
        // اگر زبان‌های بیشتری دارید، آن‌ها را به اینجا اضافه کنید
    ];
}