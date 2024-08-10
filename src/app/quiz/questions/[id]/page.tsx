// import { useRouter } from 'next/navigation'
import { getquesandchoicecount } from '@/app/actions/ui/fetchactions'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'
import DeleteComponent from '../../components/deleteComponent'

export default async function Ques({ params }: { params: { id: string } }) {
    // const router = useRouter()
    const quesandchoicecount = await getquesandchoicecount(params.id)
    return <Navbar>
        <div className='flex flex-row items-center justify-between p-4'>
            <h3 className='font-black'>{quesandchoicecount.length > 0 ? `Questions(PLAN : ${quesandchoicecount[0].quizmodel.plan}) (QUIZTYPE : ${quesandchoicecount[0].quizmodel.quiztype})` : 'Add Question'}</h3>
            <Link href={`/quiz/addquestion/${params.id}`} className='text-white p-2 text-sm rounded-md bg-primary'>+ Add Question</Link>
        </div>
        <div className='grid grid-cols-4 m-4 p-4 font-bold text-sm'>
            <div>ID</div>
            <div>Question</div>
            <div>Choices (count)</div>
            <div>Action</div>
        </div>
        {
            quesandchoicecount.length > 0 && quesandchoicecount.map(item => {
                return <div key={item.id} className='grid grid-cols-4 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
                    <p>{item.id}</p>
                    <p>{item.question}</p>
                    <p>{item._count.Choice}</p>
                    <div className='flex flex-row gap-x-4'>
                        <Link href={`/quiz/choices/${item.id}`} className='p-2 text-center rounded-md font-bold bg-gray-300'>
                            VIEW CHOICES
                        </Link>
                        <div>
                            <DeleteComponent id={item.id} redirecturl={`quiz/questions/${params.id}`} model='Question' />
                        </div>
                    </div>
                </div>
            })
        }

    </Navbar>
}