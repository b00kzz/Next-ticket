"use client";

import Sidebar from "@/components/Sidebar";

export default function Layout({ children }) {


    return (
        <div className="container">
                <div className='row'>
                    <div className='col-2 sm:ml-0'>
                        <Sidebar />
                    </div>
                    <div className='col-8'>
                        {children}
                    </div>
                </div>
        </div>
    )
}
