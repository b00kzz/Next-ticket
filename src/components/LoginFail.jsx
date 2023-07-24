import Link from 'next/link'
import React from 'react'
import { BiSolidErrorCircle } from 'react-icons/bi'

const LoginFail = () => {
    return (
        <div className='modal-portal fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm' >
            <div className="relative w-[50%] h-[60%] rounded-lg flex flex-col">
                <div className="bg-white p-2 rounded-lg">
                    <h1 className='text-center text-2xl'>ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</h1>

                    <div className="flex-center mt-2">
                        <p>กรุณาลองใหม่อีกครั้ง</p>

                    </div>
                    <div className='flex-center mt-2'>
                        <BiSolidErrorCircle size={"200"} color='red' className='icon-bounce mt-2 mb-2' />
                    </div>
                    <div className="flex-center mt-4">
                        <Link
                            href={"/login"}
                        >
                            <button className='black_btn'>ลองใหม่อีกครั้ง</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginFail