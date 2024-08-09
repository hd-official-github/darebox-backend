"use client";
import { AddOrdersAction } from '@/app/actions/AddOrdersAction';
import { AddProductivityAction } from '@/app/actions/AddProductivityAction';
import { getUsers } from '@/app/actions/ui/fetchactions'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

type UserType = {
    id: string,
    fullname: string
}
export default function OrdersApp() {
    const router = useRouter()
    const [users, setUsers] = useState<UserType[]>([])
    const [isloading, setisloading] = useState(true)
    const [error, seterror] = useState<{ msg: string | undefined } | null>(null);
    async function handleSubmit(data: FormData) {
        seterror({ msg: "" })
        const userid = data.get('userid') as string
        const productname = data.get('productname') as string
        const price = data.get('price') as string
        const date = data.get('date') as string
        // console.log(userid, productname, price, date); return
        if (!userid || !productname || !price || !date) {
            seterror({ msg: "Please fill the entire form" })
            return
        }
        // const data = new FormData()
        setisloading(true)
        // console.log(userid, productname, price, date); return
        const response = await AddOrdersAction({ userid, productname, price, date })
        setisloading(false)
        if (!response.success) {
            seterror({ msg: response.msg })
            return
        }
        else router.replace(response.redirectUrl)

    }
    useEffect(() => {

        async function fetchData() {
            const u: UserType[] = await getUsers()
            setUsers(u)
            setisloading(false)
        }
        fetchData()
    }, [])

    return (
        <Navbar>
            <div className='font-black text-md p-4'>
                <h3>Add Order</h3>
            </div>
            <form action={handleSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
                <div className='flex flex-col'>
                    {
                        isloading ? "LOADING..." : <><label>Select User</label>
                            <select name='userid' className='p-2 border-primary' defaultValue={''}>
                                <option value={''} disabled>Select</option>
                                {
                                    users.length > 0 && users.map((item: any) => {
                                        return <option key={item.id} value={item.id}>{item.fullname}</option>
                                    })
                                }

                            </select></>
                    }

                </div>
                <div className='flex flex-col'>
                    <label>Product Name</label>
                    <input type='text' placeholder='Ordered Product' className='p-2 border border-primary' name='productname' required />
                </div>
                <div className='flex flex-col'>
                    <label>Price</label>
                    <input type='text' placeholder='Price' className='p-2 border border-primary' name='price' required />
                </div>
                <div className='flex flex-col'>
                    <label>Date ordered</label>
                    <input type='text' placeholder='Eg. 24th July 2024' className='p-2 border border-primary' name='date' required />
                </div>
                {error && <span className='text-red-500'>{error.msg}</span>}
                {
                    isloading ? <button className='font-black text-white p-4 rounded-md bg-gray-500' disabled>PLEASE WAIT</button> : <button type='submit' className='font-black text-white p-4 rounded-md bg-primary'>SUBMIT</button>
                }

            </form>
        </Navbar>
    )
}
