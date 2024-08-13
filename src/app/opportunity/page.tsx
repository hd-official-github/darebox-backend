import Navbar from '@/components/Navbar'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import DeleteComponent from '../quiz/components/deleteComponent'
const prisma = new PrismaClient()
async function getOpportunity() {
  const opps = prisma.opportunity.findMany()
  return opps
}
export default async function Opportunity() {
  const oppdata = await getOpportunity()
  return (
    <Navbar>
      <div className='flex flex-row items-center justify-between p-4'>
        <h3 className='font-black'>Opportunity</h3>
        <Link href={'/opportunity/add'} className='text-white p-2 text-sm rounded-md bg-primary'>+ New Opportunity</Link>
      </div>

      <div className='grid grid-cols-4 m-4 p-4 font-bold text-sm'>
        <div>ID</div>
        <div>Tilte</div>
        <div>Description</div>
        <div>Action</div>
      </div>
      {
        oppdata.length > 0 && oppdata.map(item => (
          <div key={item.id} className='grid grid-cols-4 p-4 m-2 font-medium text-sm overflow-hidden break-words bg-white shadow-md'>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <div>
              <DeleteComponent id={item.id} redirecturl={`/opportunity`} model='opportunity' />
            </div>
          </div>
        ))
      }
    </Navbar>
  )
}
