import Navbar from '@/components/Navbar'

import Link from 'next/link'
import React from 'react'
import { getorders } from '../actions/ui/fetchactions'
import DeleteComponent from '../quiz/components/deleteComponent'



export default async function Orders() {
    const orders = await getorders()
    // console.log('ored ', orders);

    return (
        <Navbar>
            <div className='flex flex-row items-center justify-between p-4'>
                <h3 className='font-black'>Orders</h3>
                <Link href={'/orders/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Order</Link>
            </div>

            <div className='grid grid-cols-8 m-4 p-4 font-bold text-sm'>
                <div>ID</div>
                <div>Product name</div>
                <div>Price</div>
                <div>Date</div>
                <div>User</div>
                <div>Product URL</div>
                <div>Description</div>
                <div>Action</div>
            </div>
            {
                orders.length > 0 && orders.map(item => (
                    <div key={item.id} className='grid grid-cols-8 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
                        <p>{item.id}</p>
                        <p>{item.productname}</p>
                        <p>{item.price}</p>
                        <p>{item.date}</p>
                        <p>{item.User.fullname}</p>
                        <p>{item.productUrl}</p>
                        <p>{item.description}</p>
                        <div>
                            <DeleteComponent id={item.id} redirecturl={`/orders`} model='orders' />
                        </div>
                    </div>
                ))
            }

        </Navbar>
    )
}
