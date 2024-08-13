import Navbar from '@/components/Navbar'

import Link from 'next/link'
import React from 'react'
import { getads } from '../actions/ui/fetchactions'
import DeleteComponent from '../quiz/components/deleteComponent'



export default async function PageAds() {
    const ads = await getads()
    return (
        <Navbar>
            <div className='flex flex-row items-center justify-between p-4'>
                <h3 className='font-black'>Ads</h3>
                <Link href={'/ads/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Ad</Link>
            </div>

            <div className='grid grid-cols-3 m-4 p-4 font-bold text-sm'>
                <div>ID</div>
                <div>Imageurl</div>
                <div>Action</div>
            </div>
            {
                ads.length > 0 && ads.map(item => (
                    <div key={item.id} className='grid grid-cols-3 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
                        <p>{item.id}</p>
                        <p>{item.imageurl}</p>
                        <div>
                            <DeleteComponent id={item.id} redirecturl={`/ads`} model='ads' />
                        </div>

                    </div>
                ))
            }

        </Navbar>
    )
}
