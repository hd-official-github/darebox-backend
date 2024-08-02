import React from 'react'
import { adminAuthMiddleware } from '../middlewares/adminAuthMiddleware'
import Navbar from '@/components/Navbar';

export default async function Dashboard() {
    const sess = await adminAuthMiddleware();
    // console.log("SESS ", sess)
    return (
        <Navbar>
            <div>
                
            </div>
        </Navbar>

    )
}
