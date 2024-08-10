"use client";
import { AddChoiceData } from '@/app/actions/AddChoicedata';
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Choice({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [error, setError] = useState<{ msg: string | undefined } | null>(null);
    const handleChoiceSubmit = async (data: FormData) => {
        const ques = data.get('choice') as string
        const iscorrect = data.get('iscorrect') as string
        console.log(ques,iscorrect)
        data.append('quesid', params.id.toString())
        if (!ques || !iscorrect) {
            setError({ msg: "Fields should not be empty" })
            return
        }
        const response = await AddChoiceData(data)
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
                <h3 className='font-black'>New Choice</h3>
            </div>
            <form action={handleChoiceSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
                <div className='flex flex-col'>
                    <label>Choice</label>
                    <input type='text' placeholder='Your Choice' name='choice' required className='p-2 mt-2' />
                </div>
                <div className='flex flex-col'>
                    <label>Is Correct</label>
                    <select defaultValue={''} name='iscorrect' className='p-2 mt-2' required>
                        <option value={''} disabled>True or False</option>
                        <option value={'TRUE'}>TRUE</option>
                        <option value={'FALSE'}>FALSE</option>
                    </select>
                </div>
                {
                    error?.msg && <span className='text-red-500'>{error.msg}</span>
                }
                <button type='submit' className='bg-primary text-white p-2 rounded-md mt-4'>SUBMIT</button>
            </form>
        </Navbar>
    )
}
