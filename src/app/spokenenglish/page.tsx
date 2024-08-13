import Navbar from '@/components/Navbar'

import Link from 'next/link'
import React from 'react'
import { getspokenenglish } from '../actions/ui/fetchactions'
import DeleteComponent from '../quiz/components/deleteComponent'

export default async function SpokenEnglish() {
  const spokeneng = await getspokenenglish()
  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Spoken English</h3>
        <Link href={'/spokenenglish/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ Add Course</Link>
      </div>

      <div className='grid grid-cols-9 m-4 p-4 font-bold text-sm'>
        <div>ID</div>
        <div>Name</div>
        <div>Author</div>
        <div>Rating</div>
        <div>Reviews</div>
        <div>Description</div>
        <div>Price</div>
        <div>URL</div>
        <div>Action</div>
      </div>
      {
        spokeneng.length > 0 && spokeneng.map((item) => (
          <div key={item.id} className='grid grid-cols-9 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.author}</p>
            <p>{item.rating}</p>
            <p>{item.review}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>{item.url}</p>
            <div>
              <DeleteComponent id={item.id} redirecturl={`/spokenenglish`} model='spokenenglish' />
            </div>
          </div>
        ))
      }

    </Navbar>
  )
}
