"use client"
import { Addlifeskillsaction } from '@/app/actions/AddLifeSkillsAction';
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function AddLifeSkills() {
    const [error, setError] = useState<{ msg: string | undefined } | null>(null);
    const [loading, isloading] = useState(false)
    const router = useRouter()
    async function handleSubmit(data: FormData) {

        const title = data.get('title') as string
        const description = data.get('description') as string
        const price = data.get('price') as string
        const url = data.get('url') as string
        if (!title || !description || !price || !url) {
            setError({ msg: "Invalid form Fields" })
            return
        }
        const response = await Addlifeskillsaction(data)
        if (!response.success) {
            setError({ msg: response.msg })
            return
        }
        else router.replace(response.redirectUrl)
    }
    return (
        <Navbar>
            <div className='font-black text-md p-4'>
                <h3>Add LifeSkills</h3>
            </div>
            <form action={handleSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
                <div className='flex flex-col'>
                    <label>Title</label>
                    <input type='text' placeholder='Title' className='p-2 border border-primary' name='title' />
                </div>
                <div className='flex flex-col'>
                    <label>Description</label>
                    <input type='text' placeholder='Description' className='p-2 border border-primary' name='description' />
                </div>
                <div className='flex flex-col'>
                    <label>PRICE</label>
                    <input type='text' placeholder='Price' className='p-2 border border-primary' name='price' />
                </div>
                <div className='flex flex-col'>
                    <label>url</label>
                    <input type='text' placeholder='URL' className='p-2 border border-primary' name='url' />
                </div>

                <button type='submit' className='font-black text-white p-4 rounded-md bg-primary'>
                {loading ? 'PLEASE WAIT...' : 'SUBMIT'}
                </button>
            </form>
        </Navbar >
    )
}
