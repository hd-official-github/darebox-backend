import Navbar from '@/components/Navbar'

import Link from 'next/link'
import React from 'react'
import { getlifeskills } from '../actions/ui/fetchactions'
import DeleteComponent from '../quiz/components/deleteComponent'


type NewsType = {
  id: string,
  title: string,
  description: string,
  imgurl: string,

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
            <div>
              <DeleteComponent id={item.id} redirecturl={`/lifeskills`} model='lifeskills' />
            </div>
         
          </div>
        ))
      }

    </Navbar>
  )
}
