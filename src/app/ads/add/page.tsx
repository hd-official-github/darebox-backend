"use client"
import { AddAdImageAction } from '@/app/actions/AddAdImageAction';
import { AddCreativityAction } from '@/app/actions/AddCreativityAction';
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function CreaAdd() {
    const [error, setError] = useState<{ msg: string | undefined } | null>(null);

    const router = useRouter()
    async function handleSubmit(data: FormData) {
        const url = data.get('imageurl') as string
        if (!url) {
            setError({ msg: "Invalid form Fields" })
            return
        }
        const response = await AddAdImageAction(data)
        if (!response.success) {
            setError({ msg: response.msg })
            return
        }
        else router.replace(response.redirectUrl)
    }
    return (
        <Navbar>
            <div className='font-black text-md p-4'>
                <h3>Add New Advertise</h3>
            </div>
            <form action={handleSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
                <div className='flex flex-col'>
                    <label>Image URL</label>
                    <input type='text' placeholder='AD IMAGE URL' className='p-2 border border-primary' name='imageurl' />
                </div>
                {error?.msg && <span className='text-red-500'>{error.msg}</span>}
                <button type='submit' className='font-black text-white p-4 rounded-md bg-primary'>SUBMIT</button>
            </form>
        </Navbar >
    )
}
