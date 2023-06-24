"use client";

import Sidebar from './sidebar';


export default function Layout({ children }) {


    return (
        <>
            <div className='continer-fluid'>

                <div className='row'>
                    <div className='col-2'>
                        <Sidebar />
                    </div>
                    <div className='col-8'>
                        {children}
                    </div>
                </div>

            </div>
        </>
    )
}
