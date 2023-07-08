"use client"
import React, { useState } from 'react'
import moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PacmanLoader } from 'react-spinners';
import { render } from 'react-dom';

const ProductDetailModal = ({ isOpen, onClose, ticket }) => {
    if (!isOpen) return null;
    const [formData, setFormData] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [imageUrl, setImageUrl] = useState([])

    const api = process.env.API_ENDPOINT;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const myInt = parseInt(formData.ticketprice, 10);
        if (imageUrl.length < 2) {
            const res = await axios.put(api + `ticket/${ticket.ticketid}`, {
                ticketname: formData.ticketname,
                ticketprice: myInt,
                ticketdesc: formData.ticketdesc,
                ticketrepo: formData.ticketrepo,
                updatedby: ticket.createdby,
            }).then(res => {
                Swal.fire(
                    'สำเร็จ!',
                    'อัพเดตเรียบร้อยแล้ว!',
                    'success'
                )
                window.location.reload();
            }).catch(error => {
                console.log(error)
            })
        } else {
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
                console.log("formData", formData);
                e.preventDefault();
                const postData = await fetch(api + `ticket/${ticket.ticketid}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        ticketname: formData.ticketname,
                        ticketprice: myInt,
                        ticketdesc: formData.ticketdesc,
                        ticketrepo: formData.ticketrepo,
                        ticketimage: resp.data.data.data,
                        updatedby: ticket.createdby,
                    }),
                    headers: { "content-type": "application/json" }
                }).then(res => res.json())
                    .then(res => {

                        if (res !== null) {
                            Swal.fire({
                                title: 'อัพเดตสำเร็จ',
                                text: 'กลับไปยังหน้าแดชบอร์ด',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            })
                        }
                    })
            })
        }
    }


    const handleChange = async (e) => {
        if (e.target.name === "file") {
            const urlImg = URL.createObjectURL(e.target.files[0]);
            setImageUrl(urlImg);
            setImageFile({
                file: e.target.files[0],
            })
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const type = [{ value: "หมอลำ" }, { value: "นักร้องลูกทุ่ง" }, { value: "นักร้องเดี่ยว" }, { value: "ออนไลน์" }, { value: "ทั่วไป" }]
    return (
        <div className='modal-portal fixed top-0 left-0 w-screen h-screen bg-black/50 bg-opacity-25 flex justify-center items-center backdrop-blur-sm'>
            <div className="relative w-[40%] rounded-lg flex flex-col">
                <div className="bg-white p-2 rounded-lg">
                    <h1 className='text-center text-2xl'>รายละเอียดตั๋ว</h1>
                    <hr />
                    <div className='flex-center mt-2'>
                        {imageUrl.length > 2 ? (
                            <img
                                className="h-20 rounded-lg flex-center shadow-md"
                                src={imageUrl}
                                alt="ticketimage"
                            />
                        ) : (
                            <img
                                className="h-20 rounded-lg flex-center shadow-md"
                                src={ticket.ticketimage}
                                alt="ticketimage"
                            />
                        )}

                    </div>
                    <div className="flex-center mt-2 text-xs">
                        {/* <p>ภาพรายการ</p> */}
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST"
                            onSubmit={handleSubmit}
                            encType='multipart/form-data' >
                            <div>
                                <label htmlFor="ticketname" className="block text-sm font-medium leading-6 dark:text-white">
                                    ชื่อการแสดง
                                </label>
                                <div className="mt-0">
                                    <input
                                        defaultValue={ticket.ticketname}
                                        type='text'
                                        required
                                        name='ticketname'
                                        placeholder='ชื่อการแสดง'
                                        onChange={(e) => handleChange(e)}
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="ticketprice" className="block text-sm font-medium leading-6 dark:text-white">
                                    ราคาบัตร
                                </label>
                                <div className="mt-0">
                                    <input
                                        type='number'
                                        required
                                        name='ticketprice'
                                        defaultValue={ticket.ticketprice}
                                        onChange={(e) => handleChange(e)}
                                        placeholder='ราคาบัตรตัวเลขเท่านั้น'
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="ticketdesc" className="block text-sm font-medium leading-6 dark:text-white">
                                        รายละเอียดการแสดง
                                    </label>
                                </div>
                                <div className="mt-0">
                                    <input
                                        name="ticketdesc"
                                        type='text'
                                        defaultValue={ticket.ticketdesc}
                                        required
                                        onChange={(e) => handleChange(e)}
                                        placeholder='วันที่ทำการแสดงและอื่นๆ'
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="ticketrepo" className="block text-sm font-medium leading-6 dark:text-white">
                                    ช่องทางการเข้าชม
                                </label>
                                <div className="mt-0">
                                    <input
                                        type='url'
                                        name='ticketrepo'
                                        defaultValue={ticket.ticketrepo}
                                        required
                                        onChange={(e) => handleChange(e)}
                                        placeholder='   ลิ้งรับชมการแสดงหรือช่องทางการเข้าชมอื่นๆ'
                                        className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                </div>
                                <div className="mt-0">
                                    <label htmlFor="ticketimage" className="block text-sm font-medium leading-6 dark:text-white">
                                        รูปภาพประกอบ
                                    </label>
                                    <input
                                        name='file'
                                        accept='image/*'
                                        onInput={(e) => handleChange(e)}
                                        // required
                                        multiple
                                        className="block w-full rounded-md border-0 py-0.5 dark:text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:dark:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" aria-describedby="file_input_help" id="file_input" type="file" />

                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="mb-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    อัพเดตข้อมูล
                                </button>
                            </div>
                        </form>
                    </div>
                    <hr />
                    <div className="flex-center mt-2">
                        <button className='black_btn' onClick={() => onClose()}>ปิดหน้าต่าง</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailModal