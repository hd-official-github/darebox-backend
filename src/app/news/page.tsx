import Navbar from '@/components/Navbar'

import Link from 'next/link'
import React from 'react'
import { getnews } from '../actions/ui/fetchactions'
import DeleteComponent from '../quiz/components/deleteComponent'


type NewsType = {
  id: string,
  title: string,
  description: string,
  imgurl: string,

}
export default async function News() {
  const newsdata = await getnews()
  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Daily News</h3>
        <Link href={'/news/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New News</Link>
      </div>

      <div className='grid grid-cols-5 m-4 p-4 font-bold text-sm'>
        <div>ID</div>
        <div>Url</div>
        <div>title</div>
        <div>Description</div>
        <div>Action</div>
      </div>
      {
        newsdata.length > 0 && newsdata.map(item => (
          <div key={item.id} className='grid grid-cols-5 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p className='flex items-center justify-start break-words overflow-hidden'>{item.imgurl}</p>
            <p className='flex items-center justify-center'>{item.title}</p>
            <p className='flex items-center justify-start'>{item.description}</p>
            <div>
              <DeleteComponent id={item.id} redirecturl={`/news`} model='news' />
            </div>

          </div>
        ))
      }

    </Navbar>
  )
}
