import Navbar from '@/components/Navbar'

import Link from 'next/link'
import React from 'react'
import {  getlifeskills } from '../actions/ui/fetchactions'


type NewsType = {
  id: string,
  title:string,
  description:string,
  imgurl:string,

}
export default async function LifeSkills() {
  const newsdata = await getlifeskills()
  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Life SKills</h3>
        <Link href={'/lifeskills/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Skills</Link>
      </div>

      <div className='grid grid-cols-6 m-4 p-4 font-bold text-sm'>
        <div>ID</div>
        <div>Title</div>
        <div>Description</div>
        <div>Price</div>
        <div>URL</div>
        <div>Action</div>
      </div>
      {
        newsdata.length > 0 && newsdata.map(item => (
          <div key={item.id} className='grid grid-cols-6 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p className='flex items-center justify-start break-words overflow-hidden'>{item.title}</p>
            <p className='flex items-center justify-center'>{item.description}</p>
            <p className='flex items-center justify-start'>{item.price}</p>
            <p className='flex items-center justify-start'>{item.url}</p>
            <button className='flex items-center justify-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-6 rounded-full text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </button>
          </div>
        ))
      }

    </Navbar>
  )
}
