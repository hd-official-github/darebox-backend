"use client"
import Navbar from '@/components/Navbar'
import SplitComponent from '@/components/SplitComponent'
import { NoticeBoardPlan } from '@prisma/client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function NoticeBoard() {
  const [tabs, settabs] = useState(1)
  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>NoticeBoard</h3>
        <Link href={'/noticeboard/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Noticeboard</Link>
      </div>
      <div className='flex flex-row gap-x-4 p-4'>
        {
          tabs == 1 ? <button className='underline underline-offset-4 text-primary font-bold'>FOUNDATION</button> : <button
            onClick={() => settabs(1)}>FOUNDATION</button>
        }
        {
          tabs == 2 ? <button className='underline underline-offset-4 text-primary font-bold' >TOP</button> : <button onClick={() => settabs(2)}>TOP</button>
        }
        {
          tabs == 3 ? <button className='underline underline-offset-4 text-primary font-bold' >PRO</button> : <button onClick={() => settabs(3)}>PRO</button>
        }

      </div>
      <div className='p-4'>
        {
          tabs == 1 && <SplitComponent type={NoticeBoardPlan.FOUNDATION} />
        }
        {
          tabs == 2 && <SplitComponent type={NoticeBoardPlan.TOP} />
        }
        {
          tabs == 3 && <SplitComponent type={NoticeBoardPlan.PRO} />
        }
      </div>
    </Navbar>
  )
}
