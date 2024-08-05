"use client"
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { AddNewsAction } from '../../actions/AddNewsAction';

export default function AddNews() {
    const [error, setError] = useState<{ msg: string | undefined } | null>(null);
    const [loading, isloading] = useState(false)
    const router = useRouter()
    async function handleSubmit(data: FormData) {

        const title = data.get('title') as string
        const description = data.get('description') as string
        const imgurl = data.get('imgurl') as string
        if (!title || !description || !imgurl) {
            setError({ msg: "Invalid form Fields" })
            return
        }
        const response = await AddNewsAction(data)
        if (!response.success) {
            setError({ msg: response.msg })
            return
        }
        else router.replace(response.redirectUrl)
    }
    return (
        <Navbar>
            <div className='font-black text-md p-4'>
                <h3>Add News</h3>
            </div>
            <form action={handleSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
                <div className='flex flex-col'>
                    <label>Title</label>
                    <input type='text' placeholder='Title of the news' className='p-2 border border-primary' name='title' />
                </div>
                <div className='flex flex-col'>
                    <label>Description</label>
                    <input type='text' placeholder='Description of the news' className='p-2 border border-primary' name='description' />
                </div>
                <div className='flex flex-col'>
                    <label>IMAGE URL</label>
                    <input type='text' placeholder='Image url' className='p-2 border border-primary' name='imgurl' />
                </div>

                <button type='submit' className='font-black text-white p-4 rounded-md bg-primary'>
                {loading ? 'PLEASE WAIT...' : 'SUBMIT'}
                </button>
            </form>
        </Navbar >
    )
}
