"use client"
import { AddCreativityAction } from '@/app/actions/AddCreativityAction';
import { AddInterviewTrainAction } from '@/app/actions/AddInterviewTrainAction';
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function IntAdd() {
    const [error, setError] = useState<{ msg: string | undefined } | null>(null);

    const router = useRouter()
    async function handleSubmit(data: FormData) {

        const name = data.get('name') as string
        const price = data.get('price') as string
        const description = data.get('description') as string
        const url = data.get('url') as string
        if (!name || !price || !description || !url) {
            setError({ msg: "Invalid form Fields" })
            return
        }

        const response = await AddInterviewTrainAction(data)
        if (!response.success) {
            setError({ msg: response.msg })
            return
        }
        else router.replace(response.redirectUrl)
    }
    return (
        <Navbar>
            <div className='font-black text-md p-4'>
                <h3>Add Interview Training Course</h3>
            </div>
            <form action={handleSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
                <div className='flex flex-col'>
                    <label>Name</label>
                    <input type='text' placeholder='Name' className='p-2 border border-primary' name='name' />
                </div>

                <div className='flex flex-col'>
                    <label>Price</label>
                    <input type='text' placeholder='Price' className='p-2 border border-primary' name='price' />
                </div>
                <div className='flex flex-col'>
                    <label>Description</label>
                    <input type='text' placeholder='Description' className='p-2 border border-primary' name='description' />
                </div>
                <div className='flex flex-col'>
                    <label>URL</label>
                    <input type='text' placeholder='URL' className='p-2 border border-primary' name='url' />
                </div>
                <button type='submit' className='font-black text-white p-4 rounded-md bg-primary'>SUBMIT</button>
            </form>
        </Navbar >
    )
}
