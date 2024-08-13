import React from 'react'
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware'
import Navbar from '@/components/Navbar';
import CopyComp from './component/CopyComp';
import Link from 'next/link';

export default async function Dashboard() {
    const sess = await adminAuthMiddleware();
    // console.log("SESS ", sess)
    return (
        <Navbar>
            <div className='grid grid-cols-3 m-4 gap-4'>
                <div className='bg-white p-4'>
                    <h3 className='font-bold text-md mb-4'>Google Account credentials</h3>
                    <div className='flex flex-row gap-4'>
                        <p className='font-bold'>Email</p>
                        <p>mydarebox.storage@gmail.com</p>
                        <CopyComp text={'mydarebox.storage@gmail.com'} />
                    </div>
                    <div className='flex flex-row gap-4'>
                        <p className='font-bold'>Password</p>
                        <p>mUIUddJdd@</p>
                        <CopyComp text={'mUIUddJdd@'} />
                    </div>
                </div>
                <div className='bg-white p-4'>
                    <h3 className='font-bold text-md mb-4'>Cloudinary credentials</h3>
                    <div className='flex flex-row gap-4 mb-4'>
                        <p className='font-bold'>Console</p>
                        <Link className='text-blue-500 underline-offset-4 underline under' href={'https://console.cloudinary.com/'} target='_blank'>https://console.cloudinary.com/</Link>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <p className='font-bold'>Email</p>
                        <p>mydarebox.storage@gmail.com</p>
                        <CopyComp text={'mydarebox.storage@gmail.com'} />
                    </div>
                    <div className='flex flex-row gap-4'>
                        <p className='font-bold'>Password</p>
                        <p>mUIUddJdd@1</p>
                        <CopyComp text={'mUIUddJdd@1'} />
                    </div>
                </div>

            </div>
        </Navbar >

    )
}
