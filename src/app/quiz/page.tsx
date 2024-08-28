"use client";
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getquizmodel } from '../actions/ui/fetchactions'
import ActivateComponent from './components/activateComponent'
type Qzprops = {
  id: number,
  plan: string,
  quiztype: string,
  isactive: boolean,
  questionCount: string | null,
  timingInfo: string | null
}
export default function Quiz() {

  const [qzmodel, setqzmodel] = useState<Qzprops[]>([])
  const [loading, setloading] = useState(false)
  async function fetchqzmodel() {
    setloading(true)
    const quizmodel = await getquizmodel()
    setqzmodel(quizmodel)
    setloading(false)
  }
  useEffect(() => {
    fetchqzmodel()
  }, [])


  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Quiz</h3>
        <div className='flex flex-row gap-4'>
          <Link href={'/quiz/addquiz'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Quiz</Link>
          <Link href={'/quiz/quizresults'} className=' p-2 text-sm rounded-md bg-gray-600 text-white'>VIEW RESULTS</Link>
        </div>

      </div>
      <div className='grid grid-cols-6 m-4 p-4 font-bold text-sm'>
        <div>ID</div>
        <div>Plan</div>
        <div>QuizType</div>
        <div>Q.(count)</div>
        <div>Timing</div>
        {/* <div>Is Active</div> */}
        <div>Action</div>
      </div>

      {
        loading ? <p>Loading...</p> : qzmodel && qzmodel.map(item => {
          return <div key={item.id} className='grid grid-cols-6 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p>{item.plan}</p>
            <p>{item.quiztype}</p>
            <p>{item.questionCount}</p>
            <p>{item.timingInfo}</p>
            {/* <p>{item.isactive ? 'TRUE' : 'FALSE'}</p> */}
            <div className='grid grid-cols-1 gap-4'>
              <Link href={`/quiz/questions/${item.id}`} className='bg-gray-300 text-gray-900 text-center font-bold p-2 rounded-md'>
                View Questions
              </Link>
              <ActivateComponent isactive={item.isactive} id={item.id} />
              <Link href={`/quiz/editquiz/${item.id}`} className='bg-primary text-white font-bold p-2 rounded-md text-center'>EDIT INFO</Link>
            </div>

          </div>
        })
      }

    </Navbar>
  )
}
