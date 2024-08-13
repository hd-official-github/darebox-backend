
import Navbar from '@/components/Navbar'

import Link from 'next/link'
import React from 'react'
import { getshopitems } from '../actions/ui/fetchactions'
import DeleteComponent from '../quiz/components/deleteComponent'

export default async function Shop() {
  const shopitems = await getshopitems()
  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Shop</h3>
        <Link href={'/shop/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ Add ShopItem</Link>
      </div>

      <div className='grid grid-cols-8 m-4 p-4 font-bold text-sm'>
        <div>ID</div>
        <div>Name</div>
        <div>Price</div>
        <div>Description</div>
        <div>Image URL</div>
        <div>Product URL</div>
        <div>Plan</div>
        <div>Action</div>
      </div>
      {
        shopitems.length > 0 && shopitems.map((item) => (
          <div key={item.id} className='grid grid-cols-8 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.description}</p>
            <p>{item.imgurl}</p>
            <p>{item.producturl}</p>
            <p>{item.plan}</p>
            <div>
              <DeleteComponent id={item.id} redirecturl={`/shop`} model='shop' />
            </div>
          </div>
        ))
      }

    </Navbar>
  )
}
