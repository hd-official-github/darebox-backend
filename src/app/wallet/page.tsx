import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'
import { getwallet } from '../actions/ui/fetchactions'
import DeleteComponent from '../quiz/components/deleteComponent'



export default async function Wallet() {
    const walelt = await getwallet()
    // console.log('ored ', orders);

    return (
        <Navbar>
            <div className='flex flex-row items-center justify-between p-4'>
                <h3 className='font-black'>Wallet</h3>
                <Link href={'/wallet/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ Add Wallet</Link>
            </div>

            <div className='grid grid-cols-4 m-4 p-4 font-bold text-sm'>
                <div>ID</div>
                <div>User Name</div>
                <div>Amount</div>
                <div>Action</div>
            </div>
            {
                walelt.length > 0 && walelt.map(item => (
                    <div key={item.id} className='grid grid-cols-4 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
                        <p>{item.id}</p>
                        <p>{item.user.fullname}</p>
                        <p>{item.amount}</p>
                        <div>
                            <DeleteComponent id={item.id} redirecturl={`/wallet`} model='wallet' />
                        </div>
                    </div>
                ))
            }

        </Navbar>
    )
}
