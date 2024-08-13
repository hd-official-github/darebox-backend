import Navbar from '@/components/Navbar'

import Link from 'next/link'
import React from 'react'
import { getinterviewtraining } from '../actions/ui/fetchactions'
import DeleteComponent from '../quiz/components/deleteComponent'



export default async function InterviewTraining() {
  const interviewTraining = await getinterviewtraining()
  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Interview Training</h3>
        <Link href={'/interviewtraining/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Course</Link>
      </div>

      <div className='grid grid-cols-6 m-4 p-4 font-bold text-sm'>
        <div>ID</div>
        <div>Name</div>
        <div>Description</div>
        <div>Price</div>
        <div>URL</div>
        <div>Action</div>
      </div>
      {
        interviewTraining.length > 0 && interviewTraining.map(item => (
          <div key={item.id} className='grid grid-cols-6 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>{item.url}</p>
            <div>
              <DeleteComponent id={item.id} redirecturl={`/interviewtraining`} model='interviewtraining' />
            </div>
          </div>
        ))
      }

    </Navbar>
  )
}
