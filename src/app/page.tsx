import Link from "next/link";
import {getDictionary} from "@/app/[lang]/dictionaries";
import('../dictionaries/en/common.json')
import { Button } from "@/components/ui/button"


export default async function Page() {

    const dict = await getDictionary("en")

  return (
      <div>
          <Link href={"/"}>Home</Link> |
          <Link href={"/en"}>EN</Link> |
          <Link href={"/fa"}>FA</Link>
          <h1>{dict.products.cart}</h1>
          <Button>Click me</Button>
      </div>
  )
}