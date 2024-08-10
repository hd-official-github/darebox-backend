"use client"
import { AddNewQuiz } from '@/app/actions/AddNewQuiz'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddQuiz() {
  const router = useRouter()
  const [error, setError] = useState<{ msg: string | undefined } | null>(null);
  const handleQuizSubmit = async (data: FormData) => {
    const plan = data.get('plan') as string
    const qtype = data.get('quiztype') as string
    if (!plan || !qtype) {
      setError({ msg: "Fields should not be empty" })
      return
    }
    const response = await AddNewQuiz(data)
    if (!response.success) {
      setError({ msg: response.msg })
      return
    }
    else router.replace(response.redirectUrl)
  }
  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>New Quiz</h3>
      </div>

      <form action={handleQuizSubmit} className='flex flex-col gap-y-4 max-w-[50%] m-4 font-bold'>
        <div className='flex flex-col'>
          <label>PLAN</label>
          <select defaultValue={''} name='plan' required className='p-2 mt-2'>
            <option value={''} disabled>Select a plan</option>
            <option value={'FOUNDATION'}>FOUNDATION</option>
            <option value={'TOP'}>TOP</option>
            <option value={'PRO'}>PRO</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label>QUIZ TYPE</label>
          <select defaultValue={''} name='quiztype' required className='p-2 mt-2'>
            <option value={''} disabled>Select a quiztype</option>
            <option value={'DAILY'}>DAILY</option>
            <option value={'WEEKLY'}>WEEKLY</option>
            <option value={'MONTHLY'}>MONTHLY</option>
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
