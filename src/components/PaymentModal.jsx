import React from 'react'
import moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentModal = ({ isOpen, onClose, detail }) => {
    if (!isOpen) return null;
    const api = process.env.API_ENDPOINT;
    const handleSubmit = async (payid) => {
        Swal.fire({
            title: 'คุณได้ตรวจสอบแล้วใช่หรือไม่',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const paymentstatus = "ทำรายการสำเร็จ"
                axios.put(api + "payment/" + payid, { paymentstatus })
                    .then(res => {
                        window.location.reload();
                        onClose();
                    })
              Swal.fire(
                'สำเร็จ!',
                'เปลี่ยนสถานะเรียบร้อยแล้ว!',
                'success'
              )
            }
          })
    }
    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
            <div className="w-[50%] h-[70%]  rounded-lg flex flex-col">
                <button className='px-5 py-2.5 mr-5 justify-center items-center place-self-end text-white' onClick={() => onClose()}>ปิด X</button>
                <div className="bg-white p-2 rounded-lg">
                    {detail.paymentstatus === "ทำรายการสำเร็จ" ?
                        <h1 className='text-center text-2xl text-green-800'>ตรวจสอบแล้ว</h1>
                        :
                        <h1 className='text-center text-2xl'>รายละเอียดการชำระเงิน</h1>

                    }
                    <hr />
                    <div className='flex-center space-x-10 mt-4 mb-4'>
                        <img
                            className="h-96 rounded-lg flex-center shadow-md"
                            src={detail.payslip}
                            alt=""
                        />
                        <div className='flex flex-col rounded-md'>
                            <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">ชื่อผู้ซื้อ:  {detail.createdby}</span>
                            <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">ชื่อรายการ:  {detail.ticketname}</span>
                            <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">ราคา: {detail.ticketprice}</span>
                            <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">รหัสการซื้อ: {detail.payid}</span>
                            <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">รหัสผู้ขาย: {detail.userid}</span>
                            <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">รหัสผู้ซื้อ: {detail.byid}</span>
                            <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">รายละเอียดตั๋ว: {detail.ticketdesc}</span>
                            <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">สถานะการชำระ: {detail.paymentstatus}</span>
                            <span className="text-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">วันที่ซื้อ: {moment(detail.createddate).locale('th').format('lll')}</span>
                        </div>
                    </div>
                    <hr />
                    <div className="flex-center mt-2">
                        {detail.paymentstatus === "ทำรายการสำเร็จ" ?
                            <button className='black_btn mr-4' onClick={() => onClose()}>ปิด</button>
                            :
                            <button type='submit' className='black_btn mr-4' onClick={() => handleSubmit(detail.payid)}>ยืนยันการตรวจสอบ</button>

                        }
                    </div>

                </div>

            </div>
        </div>
    )
}

export default PaymentModal