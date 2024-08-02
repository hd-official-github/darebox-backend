import Image from 'next/image'
import Link from 'next/link'
import React, { ReactElement, ReactNode } from 'react'
interface NavbarProps {
    children: ReactNode | ReactElement;
}
export default function Navbar({ children }: NavbarProps) {
    return (
        <>
            <nav>
                <div className='flex flex-row justify-between items-center p-2 border-b-gray-400 border-b'>
                    <Image src={'/full-logo-dump.jpg'} width={160} height={72} alt='logo' />
                    <Link href={'/api/auth/signout'} className='text-red-500 font-bold'>LOGOUT</Link>
                </div>
            </nav>
            <div className='grid grid-cols-8'>
                <div className='flex flex-col p-4 font-bold gap-y-2 bg-primary text-white col-span-1 min-h-[90vh]'>
                    <Link href={'/dashboard'}>Dashboard</Link>
                    <Link href={'/users'}>Users</Link>
                    <Link href={'/orders'}>Orders</Link>
                    <Link href={'/wallet'}>User Wallet</Link>
                    <hr></hr>
                    <Link href={'/creativity'}>Creativity</Link>
                    <Link href={'/opportunity'}>Opportunity</Link>
                    <Link href={'/productivity'}>Productivity</Link>
                    <hr></hr>
                    <Link href={'/noticeboard'}>Notice Board</Link>
                    <Link href={'/news'}>News</Link>
                    <Link href={'/quiz'}>Quiz</Link>
                    <Link href={'/lifeskills'}>LifeSkills</Link>
                    <Link href={'/spokenenglish'}>Spoken English</Link>
                    <Link href={'/interviewtraining'}>Interview Training</Link>
                    <Link href={'/workshop'}>Workshop</Link>
                    <Link href={'/shop'}>Shop</Link>
                </div>
                <div className='col-span-7 bg-gray-100 h-[90vh] overflow-y-scroll overflow-x-hidden '>
                    {children}
                </div>
            </div>
        </>

    )
}
