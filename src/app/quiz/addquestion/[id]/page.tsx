"use client";
import { AddquestionAction } from '@/app/actions/AddquestionAction';
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Addques({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [error, setError] = useState<{ msg: string | undefined } | null>(null);
    const handleQuesSubmit = async (data: FormData) => {
        const ques = data.get('question') as string
        data.append('quesid', params.id.toString())
        if (!ques) {
            setError({ msg: "Fields should not be empty" })
            return
        }
        const response = await AddquestionAction(data)
        console.log('res ', response);

        if (!response.success) {
            setError({ msg: response.msg })
            return
        }
        else router.replace(response.redirectUrl)
    }
    return (
        <Navbar>
            <div className='flex flex-row items-center justify-between p-4'>
                <h3 className='font-black'>New Question</h3>
            </div>

            <form action={handleQuesSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
                <div className='flex flex-col'>
                    <label>Question</label>
                    <input type='text' placeholder='Your Question' name='question' required className='p-2 mt-2' />
                </div>
                {
                    error?.msg && <span className='text-red-500'>{error.msg}</span>
                }
                <button type='submit' className='bg-primary text-white p-2 rounded-md mt-4'>SUBMIT</button>
            </form>
        </Navbar>
    )
}
