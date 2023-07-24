"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PacmanLoader } from 'react-spinners';
import { render } from 'react-dom';


const payment = () => {
    const { data: session } = useSession()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({})
    const [payment, setPayment] = useState([])
    const [formData, setFormData] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [imageUrl, setImageUrl] = useState([])

    // const [newImageUrl, setNewImageUrl] = useState([])

    const api = process.env.API_ENDPOINT;
    const { ticketid } = useParams();

    useEffect(() => {

        loadPayments();
        loadData(ticketid);
    }, []);

    const loadData = async (ticketid) => {
        const response = await axios.get(api + "ticket/" + ticketid)
            .then(res => {

                setItem(res.data)
                setIsLoaded(true)

            }).catch(err => {
                setError(err)
                // console.log(err);
            })
    }
    const loadPayments = async () => {
        const response = await axios.get(api + "payments")
            .then(res => {
                setPayment(res.data)
                setIsLoaded(true)

            }).catch(err => {
                setError(err)
                // console.log(err);
            })
    }


    const handleChange = (e) => {
        const urlImg = URL.createObjectURL(e.target.files[0]);
        setImageUrl(urlImg);

        if (e.target.name === "file") {
            setImageFile({
                file: e.target.files[0],
            })
            setFormData({
                userid: session?.user.userid,
                payslip: "5555",
                ticketid: item.ticketid,
                byid: item.userid,
                ticketname: item.ticketname,
                ticketprice: item.ticketprice,
                ticketdesc: item.ticketdesc,
                createdby: session?.user.nickname,
            })
        }

    }

    // console.log("formfile", imageFile);

    const handleSubmit = async (e) => {
        Swal.fire({
            title: "กำลังอัพโหลดข้อมูล",
            html: '<div class="flex-center overflow-y-hidden" id="loading-spinner"></div>',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                render(
                    <PacmanLoader color="#326bc2" size={60} loading={true} />,
                    document.getElementById("loading-spinner")
                );
            },
        });
        e.preventDefault();
        const response = await axios.post(api + "image", imageFile, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(async resp => {
            // console.log("formData", formData);
            e.preventDefault();
            const countsell = await axios.put(api + "ticket/count/" + item.ticketid).then(res => { console.log(res) }).catch(err => {
                setError(err)
                // console.log(err);
            })
            const postData = await fetch(api + "payment", {
                method: 'POST',
                body: JSON.stringify({
                    userid: session?.user.userid,
                    payslip: resp.data.data.data,
                    ticketid: item.ticketid,
                    ticketname: item.ticketname,
                    ticketprice: item.ticketprice,
                    ticketdesc: item.ticketdesc,
                    ticketrepo: item.ticketrepo,
                    createdby: session?.user.nickname,
                    byid: item.userid,
                }),
                headers: { "content-type": "application/json" }
            }).then(res => res.json())
                .then(res => {

                    if (res !== null) {
                        Swal.fire({
                            title: 'ชำระเงินสำเร็จ',
                            text: 'กลับไปยังหน้าประวัติการซื้อ',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.replace("/user/history/" + session?.user.userid)
                            }
                        })
                    }
                })
        })

        // const image = { [e.target.name]: e.target.files[0] }

    }

    // console.clear()
    return (
        <>
            {payment.map((pay, index) => (
                <div key={index}>
                    {pay.userid === session?.user.userid && pay.ticketid === item.ticketid && Swal.fire({
                        title: 'คุณได้ทำรายการนี้ไปแล้ว',
                        text: 'กรุณาตรวจสอบที่ประวัติการซื้อ',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ตกลง',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then(() => {
                        window.location.replace("/user/history/" + session?.user.userid)
                    })}
                </div>
            ))}
            <div className='grid lg:grid-cols-2 lg:gap-2'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
                            รายละเอียดการชำระ
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST"
                            onSubmit={handleSubmit}
                            encType='multipart/form-data'
                        >

                            <div>
                                <label className="block text-sm font-medium leading-6 dark:text-white">
                                    ชื่อการแสดง
                                </label>
                                <div className="mt-2">
                                    <input
                                        name='ticketname'
                                        type='text'
                                        defaultValue={item.ticketname}
                                        onChange={(e) => setFormData(e.target.value)}
                                        readOnly
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 dark:text-white">
                                    ราคา
                                </label>
                                <div className="mt-2">
                                    <input
                                        name='ticketprice'
                                        type='number'
                                        defaultValue={item.ticketprice}
                                        onChange={(e) => setFormData(e.target.value)}
                                        readOnly
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 dark:text-white">
                                    ประเภทการแสดง
                                </label>
                                <div className="mt-2">
                                    <input
                                        name='tickettype'
                                        type='text'
                                        defaultValue={item.tickettype}
                                        onChange={(e) => setFormData(e.target.value)}
                                        readOnly
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 dark:text-white">
                                    ชื่อผู้ซื้อ
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={session?.user.nickname}
                                        onChange={(e) => setFormData(e.target.value)}
                                        name='nickname'
                                        type='text'
                                        readOnly
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 dark:text-white">
                                        รายละเอียด
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        name='ticketdesc'
                                        defaultValue={item.ticketdesc}
                                        onChange={(e) => setFormData(e.target.value)}
                                        type='text'
                                        readOnly
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium leading-6 dark:text-white">
                                            หลักฐานการโอน
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            name='file'
                                            accept='image/*'
                                            onInput={(e) => handleChange(e)}
                                            multiple
                                            className="block w-full rounded-md border-0 py-0.5 dark:text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:dark:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" aria-describedby="file_input_help" id="file_input" type="file" />
                                    </div>
                                </div>
                                <br />
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    ส่งรายการ
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 container'>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {imageUrl.length > 2

                            ? (
                                <>
                                    <div className='container bg-white rounded-lg shadow-lg p-10'>
                                        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                            ตัวอย่างรูป
                                        </h1>
                                        <img
                                            className="mx-auto h-auto w-auto"
                                            src={imageUrl}
                                            alt="PromptPay"
                                        />
                                        <h1 className="text-center font-bold leading-9 tracking-tight text-red-600">
                                            *หมายเหตุ ก่อนส่งสลิปกรุณณากรอกชื่อเฟสบุ๊คไว้ในบันทึกช่วยจำด้วย!!
                                        </h1>
                                    </div>
                                </>
                            )
                            : (
                                <>
                                    <div className='container bg-white rounded-lg shadow-lg p-10'>
                                        <img
                                            className="mx-auto h-auto w-auto"
                                            src="https://www.finnomena.com/wp-content/uploads/2016/10/promt-pay-logo.jpg"
                                            alt="PromptPay"
                                        />
                                        <img
                                            className="mx-auto h-auto w-auto"
                                            src={item.ticketqr}
                                            alt="PromptPay"
                                        />
                                        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                            แสกน QR-Code เพื่อชำระเงิน
                                        </h1>
                                        <h1 className="text-center text-sm font-bold leading-9 tracking-tight text-red-600">
                                            *หมายเหตุ ก่อนส่งสลิปกรุณณากรอกชื่อเฟสบุ๊คไว้ในบันทึกช่วยจำด้วย!!
                                        </h1>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>

            </div>
        </>
    )

}

export default payment