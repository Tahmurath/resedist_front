"use client"

import {z} from "zod";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {getUserFromToken, isExpiredJwt, saveTokenToCookie} from "@/lib/jwt";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {toast} from "@/hooks/use-toast";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {cn} from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react"

interface DepType {
    value: number;
    label: string;
}

const token = isExpiredJwt()

const FormSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    departmenttypeid: z.preprocess((value) => Number(value), z.number({
        message: "DepartmentTypeID must be a number.",
    })),
    parentid: z.preprocess((value) => Number(value), z.number({
        message: "ParentID must be a number.",
    })),

});


function InputForm({
                       title = "",
                       departmenttypeid,
                       parentid,
                   }: {
    title?: string; // می‌تواند خالی باشد
    departmenttypeid?: number; // می‌تواند خالی باشد
    parentid?: number; // می‌تواند خالی باشد
}) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: title,
            departmenttypeid: departmenttypeid,
            parentid: parentid,
        },
    })

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [depTypes, setDepTypes] = useState<DepType[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        async function fetchDepTypes(searchQuery = "") {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/department/list?query=${searchQuery}`);
                const data = await response.json();
                setDepTypes(data);
            } catch (error) {
                console.error('Error fetching depTypes:', error);
            }
        }

        fetchDepTypes(query); // دریافت داده‌ها بر اساس عبارت جستجو
    }, [query]);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        //alert(JSON.stringify(data, null, 2))
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
            ),
        })
        //const token = getTokenFromCookie()
        fetch("http://127.0.0.1:8080/api/v1/department/new", {
            method: "POST",
            body: JSON.stringify({
                title: data.title,
                departmenttypeid: Number(data.departmenttypeid),
                parentid: Number(data.parentid),
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // ست کردن هدر Authorization
            }
        })
            .then((response) => response.json())
            .then((json) =>
            {
                console.log(json);
                // saveTokenToCookie(json.token)
                // router.push('/dashboard');
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm/6 font-medium text-gray-900">Title</FormLabel>

                            <FormControl>
                                <Input placeholder="Title" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Department title
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="departmenttypeid"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>departmenttypeid</FormLabel>
                            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                                        >
                                            {field.value
                                                ? depTypes.find(
                                                    (departmenttypeid) => departmenttypeid.value === field.value
                                                )?.label
                                                : "Select department type"}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search framework..."
                                            className="h-9"
                                            onValueChange={setQuery}
                                        />
                                        <CommandList>
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {depTypes.map((departmenttypeid) => (
                                                    <CommandItem
                                                        value={departmenttypeid.label}
                                                        key={departmenttypeid.value}
                                                        onSelect={() => {
                                                            form.setValue("departmenttypeid", departmenttypeid.value)
                                                            setIsPopoverOpen(false);
                                                        }}
                                                    >
                                                        {departmenttypeid.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                departmenttypeid.value === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This is the department type that will be used in the dashboard.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="parentid"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm/6 font-medium text-gray-900">parentid</FormLabel>
                            <FormControl>
                                <Input placeholder="parentid" {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                parentid
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default function Home() {


    const [error, setError] = useState<any>(null);



  return (
      <div className="flex-1 lg:max-w-2xl">
          <h1>Department</h1>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                  <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                      add department
                  </h2>
              </div>

              <div>
                  <InputForm title={""} departmenttypeid={undefined} parentid={undefined}></InputForm>
              </div>
          </div>
      </div>
  );
}


