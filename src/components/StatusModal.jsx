import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { BiSolidErrorCircle } from 'react-icons/bi';
import axios from 'axios';

const StatusModal = ({ status, detail }) => {
    console.log("🚀 ~ file: StatusModal.jsx:9 ~ StatusModal ~ status:", status)
    const api = process.env.API_ENDPOINT;
    const handleDelete = async () => {
        axios.delete(api + "userdetail/" + detail.userdeid)
            .then(res => {
                window.location.replace("/")
            })
    }
    return (
        <div className='modal-portal fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm' >
            <div className="relative w-[50%] h-[60%] rounded-lg flex flex-col">
                <div className="bg-white p-2 rounded-lg">
                    {status === "ไม่ผ่านการอนุมัติ" && <h1 className='text-center text-2xl'>ข้อมูลไม่ถูกต้อง</h1>}
                    {status === "รออนุมัติ" && <h1 className='text-center text-2xl'>คุณได้ทำการลงทะเบียนขายไปแล้ว</h1>}

                    <div className="flex-center mt-2">
                        {status === "ไม่ผ่านการอนุมัติ" && <p>คุณ{status}กรุณาลองใหม่อีกครั้ง</p>}
                        {status === "รออนุมัติ" && <p>กรุณารอการอนุมัติจากแอดมิน</p>}

                    </div>
                    <div className='flex-center mt-2'>
                        {status === "ไม่ผ่านการอนุมัติ" && <BiSolidErrorCircle size={"200"} color='red' className='icon-bounce mt-2 mb-2' />}
                        {status === "รออนุมัติ" && <FontAwesomeIcon icon={faCheckCircle} size="10x" color="#73ff00" className='icon-bounce mt-2 mb-2' />}
                    </div>
                    <div className="flex-center mt-4">
                        {status === "ไม่ผ่านการอนุมัติ" && <button className='black_btn' onClick={handleDelete}>กลับไปยังหน้าแรก</button>}
                        {status === "รออนุมัติ" &&<button className='black_btn' onClick={() => window.location.replace("/")}>กลับไปยังหน้าแรก</button>}
                        {status === undefined &&<button className='black_btn' onClick={() => window.location.replace("/")}>กลับไปยังหน้าแรก</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusModal