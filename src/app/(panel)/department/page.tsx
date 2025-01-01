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

export default function Home() {

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

    const [error, setError] = useState<any>(null);


    function InputForm({title,departmenttypeid,parentid}:{title: string,departmenttypeid: number,parentid:number}) {

        const form = useForm<z.infer<typeof FormSchema>>({
            resolver: zodResolver(FormSchema),
            defaultValues: {
                title: title,
                departmenttypeid: departmenttypeid,
                parentid: parentid,
            },
        })

        function onSubmit(data: z.infer<typeof FormSchema>) {
            //alert(JSON.stringify(data, null, 2))

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
                            <FormItem>
                                <FormLabel className="block text-sm/6 font-medium text-gray-900">departmenttypeid</FormLabel>
                                <FormControl>
                                    <Input placeholder="departmenttypeid" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    departmenttypeid
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
                  <InputForm title={""} departmenttypeid={''} parentid={''}></InputForm>
              </div>
          </div>


      </div>
  );
}


