import Navbar from '@/components/Navbar'
import React from 'react'
import DeleteComponent from '../components/deleteComponent'
import { getquizresults } from '@/app/actions/ui/fetchactions'

export default async function QuizResults() {
    const qres = await getquizresults()
    return (
        <Navbar>
            <div className='flex flex-row items-center justify-between p-4'>
                <h3 className='font-black'>QUIZ RESULTS</h3>
            </div>

            <div className='bg-white grid grid-cols-3 m-4'>
                <div className='col-span-3 flex items-center justify-center font-bold'>FOUNDATION </div>
                <div className='border border-gray-400 mt-4'>
                    <h3 className='text-center font-bold'>DAILY</h3>
                    {
                        qres && qres.filter(item => item.plan == "FOUNDATION" && item.type == "DAILY").sort((a, b) => Number(b.score) - Number(a.score)).map(item => {
                            return <div className='grid grid-cols-4 items-center m-4 text-sm' key={item.id}>
                                <div>{item.id}</div>
                                <div>{item.user.fullname}</div>
                                <div>{item.score}</div>
                                <DeleteComponent redirecturl='/quiz/quizresults' id={item.id} model='quizresults' />
                            </div>
                        })
                    }
                </div>
                <div className='border border-gray-400 mt-4'>
                    <h3 className='text-center font-bold'>WEEKLY</h3>
                    {
                        qres && qres.filter(item => item.plan == "FOUNDATION" && item.type == "WEEKLY").sort((a, b) => Number(b.score) - Number(a.score)).map(item => {
                            return <div className='grid grid-cols-4 items-center m-4 text-sm' key={item.id}>
                                <div>{item.id}</div>
                                <div>{item.user.fullname}</div>
                                <div>{item.score}</div>
                                <DeleteComponent redirecturl='/quiz/quizresults' id={item.id} model='quizresults' />
                            </div>
                        })
                    }
                </div>
                <div className='border border-gray-400 mt-4'>
                    <h3 className='text-center font-bold'>MONTHLY</h3>
                    {
                        qres && qres.filter(item => item.plan == "FOUNDATION" && item.type == "MONTHLY").sort((a, b) => Number(b.score) - Number(a.score)).map(item => {
                            return <div className='grid grid-cols-4 items-center m-4 text-sm' key={item.id}>
                                <div>{item.id}</div>
                                <div>{item.user.fullname}</div>
                                <div>{item.score}</div>
                                <DeleteComponent redirecturl='/quiz/quizresults' id={item.id} model='quizresults' />
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='bg-white grid grid-cols-3 m-4'>
                <div className='col-span-3 flex items-center justify-center font-bold'>TOP </div>
                <div className='border border-gray-400 mt-4'>
                    <h3 className='text-center font-bold'>DAILY</h3>
                    {
                        qres && qres.filter(item => item.plan == "TOP" && item.type == "DAILY").sort((a, b) => Number(b.score) - Number(a.score)).map(item => {
                            return <div className='grid grid-cols-4 items-center m-4 text-sm' key={item.id}>
                                <div>{item.id}</div>
                                <div>{item.user.fullname}</div>
                                <div>{item.score}</div>
                                <DeleteComponent redirecturl='/quiz/quizresults' id={item.id} model='quizresults' />
                            </div>
                        })
                    }
                </div>
                <div className='border border-gray-400 mt-4'>
                    <h3 className='text-center font-bold'>WEEKLY</h3>
                    {
                        qres && qres.filter(item => item.plan == "TOP" && item.type == "WEEKLY").sort((a, b) => Number(b.score) - Number(a.score)).map(item => {
                            return <div className='grid grid-cols-4 items-center m-4 text-sm' key={item.id}>
                                <div>{item.id}</div>
                                <div>{item.user.fullname}</div>
                                <div>{item.score}</div>
                                <DeleteComponent redirecturl='/quiz/quizresults' id={item.id} model='quizresults' />
                            </div>
                        })
                    }
                </div>
                <div className='border border-gray-400 mt-4'>
                    <h3 className='text-center font-bold'>MONTHLY</h3>
                    {
                        qres && qres.filter(item => item.plan == "TOP" && item.type == "MONTHLY").sort((a, b) => Number(b.score) - Number(a.score)).map(item => {
                            return <div className='grid grid-cols-4 items-center m-4 text-sm' key={item.id}>
                                <div>{item.id}</div>
                                <div>{item.user.fullname}</div>
                                <div>{item.score}</div>
                                <DeleteComponent redirecturl='/quiz/quizresults' id={item.id} model='quizresults' />
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='bg-white grid grid-cols-3 m-4'>
                <div className='col-span-3 flex items-center justify-center font-bold'>PRO </div>
                <div className='border border-gray-400 mt-4'>
                    <h3 className='text-center font-bold'>DAILY</h3>
                    {
                        qres && qres.filter(item => item.plan == "PRO" && item.type == "DAILY").sort((a, b) => Number(b.score) - Number(a.score)).map(item => {
                            return <div className='grid grid-cols-4 items-center m-4 text-sm' key={item.id}>
                                <div>{item.id}</div>
                                <div>{item.user.fullname}</div>
                                <div>{item.score}</div>
                                <DeleteComponent redirecturl='/quiz/quizresults' id={item.id} model='quizresults' />
                            </div>
                        })
                    }
                </div>
                <div className='border border-gray-400 mt-4'>
                    <h3 className='text-center font-bold'>WEEKLY</h3>
                    {
                        qres && qres.filter(item => item.plan == "PRO" && item.type == "WEEKLY").sort((a, b) => Number(b.score) - Number(a.score)).map(item => {
                            return <div className='grid grid-cols-4 items-center m-4 text-sm' key={item.id}>
                                <div>{item.id}</div>
                                <div>{item.user.fullname}</div>
                                <div>{item.score}</div>
                                <DeleteComponent redirecturl='/quiz/quizresults' id={item.id} model='quizresults' />
                            </div>
                        })
                    }
                </div>
                <div className='border border-gray-400 mt-4'>
                    <h3 className='text-center font-bold'>MONTHLY</h3>
                    {
                        qres && qres.filter(item => item.plan == "PRO" && item.type == "MONTHLY").sort((a, b) => Number(b.score) - Number(a.score)).map(item => {
                            return <div className='grid grid-cols-4 items-center m-4 text-sm' key={item.id}>
                                <div>{item.id}</div>
                                <div>{item.user.fullname}</div>
                                <div>{item.score}</div>
                                <DeleteComponent redirecturl='/quiz/quizresults' id={item.id} model='quizresults' />
                            </div>
                        })
                    }
                </div>
            </div>
        </Navbar>
    )
}
