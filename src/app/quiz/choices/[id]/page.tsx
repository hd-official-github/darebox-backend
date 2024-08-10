// import { useRouter } from 'next/navigation'
// import { getquesandchoice } from '@/app/actions/ui/fetchactions'
import { getchoices } from '@/app/actions/ui/fetchactions'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'
import DeleteComponent from '../../components/deleteComponent'

export default async function Choices({ params }: { params: { id: string } }) {
    // const router = useRouter()
    const choices = await getchoices(params.id)
    return <Navbar>
        <div className='flex flex-row items-center justify-between p-4'>
            <h3 className='font-black'>Choices</h3>
            <Link href={`/quiz/addchoice/${params.id}`} className='text-white p-2 text-sm rounded-md bg-primary'>+ Add Choice</Link>
        </div>
        <div className='grid grid-cols-4 m-4 p-4 font-bold text-sm'>
            <div>ID</div>
            <div>Choice</div>
            <div>Is Correct</div>
            <div>Action</div>
        </div>
        {
            choices && choices.map(item => {
                return <div key={item.id} className='grid grid-cols-4 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
                    <p>{item.id}</p>
                    <p>{item.choice}</p>
                    <p>{item.iscorrect ? 'TRUE':"FALSE"}</p>
                    <div>
                        <DeleteComponent id={item.id} redirecturl={`quiz/choices/${params.id}`} model='Choice'/>
                    </div>

                </div>
            })
        }

    </Navbar>
}