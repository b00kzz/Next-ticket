"use client"
import UserModal from '@/components/UserModal';
import React, { Fragment, useState } from 'react';

const page = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <div className='text-center p-10'>
        <h1>test modal</h1>
        <button className='px-5 py-2.5 mr-5 justify-center items-center black_btn' onClick={() => setShowModal(true)}>open</button>
        <button className='px-5 py-2.5 mr-5 justify-center items-center black_btn'>open</button>
        <button className='px-5 py-2.5 mr-5 justify-center items-center black_btn'>open</button>
      </div>
      <UserModal isOpen={showModal} onClose={() => setShowModal(false)}/>
    </Fragment>
  )
}

export default page