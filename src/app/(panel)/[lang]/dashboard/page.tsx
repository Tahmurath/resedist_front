
 
// import { useToast } from "@/hooks/use-toast"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
// import { buttonVariants } from "@/components/ui/button"
// import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

    </div>
  );
}

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'fa' },
        // اگر زبان‌های بیشتری دارید، آن‌ها را به اینجا اضافه کنید
    ];
}

