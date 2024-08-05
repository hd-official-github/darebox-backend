import Navbar from '@/components/Navbar'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import React from 'react'
const prisma = new PrismaClient()
async function getUsers() {
  const users = await prisma.user.findMany()
  revalidatePath('/users')
  return users
}
export default async function Users() {
  const users = await getUsers()
  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Users</h3>
        {/* <Link href={'/opportunity/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Opportunity</Link> */}
      </div>

      <div className='grid grid-cols-9 m-4 p-4 font-bold text-sm justify-start items-start'>
        <div>ID</div>
        <div>Fullname</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Grade</div>
        <div>City</div>
        <div>Role</div>
        <div>Referred By</div>
        <div>Action</div>
      </div>
      {
        users.length > 0 && users.map(item => (
          <div key={item.id} className=' grid grid-cols-9 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p>{item.fullname}</p>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p>{item.grade}</p>
            <p>{item.city ? item.city : "NULL"}</p>
            <p>{item.role}</p>
            <p>{item.refercode ? item.refercode : "NULL"}</p>
            <button className='flex'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-6 rounded-full text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </button>
          </div>
        ))
      }
    </Navbar>
  )
}
