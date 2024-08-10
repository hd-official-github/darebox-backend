import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'
import { getquizmodel } from '../actions/ui/fetchactions'
import ActivateComponent from './components/activateComponent'

export default async function Quiz() {
  const quizmodel = await getquizmodel()

  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Quiz</h3>
        <div className='flex flex-row gap-4'>
          <Link href={'/quiz/addquiz'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Quiz</Link>
          <Link href={'/quiz/quizresults'} className=' p-2 text-sm rounded-md bg-gray-600 text-white'>VIEW RESULTS</Link>
        </div>

      </div>
      <div className='grid grid-cols-5 m-4 p-4 font-bold text-sm'>
        <div>ID</div>
        <div>Plan</div>
        <div>QuizType</div>
        <div>Is Active</div>
        <div>Action</div>
      </div>
      {
        quizmodel && quizmodel.map(item => {
          return <div key={item.id} className='grid grid-cols-5 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p>{item.plan}</p>
            <p>{item.quiztype}</p>
            <p>{item.isactive ? 'TRUE' : 'FALSE'}</p>
            <div className='flex flex-row gap-4'>
              <Link href={`/quiz/questions/${item.id}`} className='flex items-center justify-start text-sm bg-gray-200 border p-2 rounded-md'>
                View Questions
              </Link>
              <ActivateComponent isactive={item.isactive} id={item.id} />
            </div>

          </div>
        })
      }

    </Navbar>
  )
}
