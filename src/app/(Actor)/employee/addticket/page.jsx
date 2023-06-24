"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const addTicket = () => {
  const { data: session } = useSession()
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({})
  const [formData, setFormData] = useState([])
  const [imageFile, setImageFile] = useState([])
  const [imageUrl, setImageUrl] = useState([])
  const api = process.env.API_ENDPOINT;

  useEffect(() => {
    console.clear()
  }, []);

  const handleChange = (e) => {

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
      userid: session?.user.userid,
    })
  }

  const handleSubmit = async (e) => {
    Swal.fire({
      title: 'กำลังทำรายการ',
      html: '<button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...</button>',
      showConfirmButton: false,
      allowOutsideClick: false,
    })
    e.preventDefault();
    // console.log("target", e.target.value);
    // console.log("name", e.target.name);
    const response = await axios.post(api + "image", imageFile, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(async resp => {
      console.log("formData", formData);
      e.preventDefault();
      const postData = await fetch(api + "ticket", {
        method: 'POST',
        body: JSON.stringify({
          userid: session?.user.userid,
          ticketname: formData.ticketname,
          tickettype: formData.tickettype,
          ticketprice: formData.ticketprice,
          ticketimage: resp.data.data.data,
          ticketdesc: formData.ticketdesc,
          ticketrepo: formData.ticketrepo,
          createdby: session?.user.nickname,
        }),
        headers: { "content-type": "application/json" }
      }).then(res => res.json())
        .then(res => {

          if (res !== null) {
            Swal.fire({
              title: 'เพิ่มรายการสำเร็จ',
              text: 'กลับไปยังหน้าแดชบอร์ด',
              icon: 'success',
              confirmButtonColor: '#3085d6',
            }).then((result) => {
              if (result.isConfirmed) {
                {
                  session?.user.roleid === "Admin"
                    ?
                    window.location.replace("/admin/manage")
                    :
                    window.location.replace("/employee/manage/" + session?.user.userid)
                }
              }
            })
          }
        })
    })
  }

  console.log(formData)

  const type = [{ value: "หมอลำ" }, { value: "นักร้องลูกทุ่ง" }, { value: "นักร้องเดี่ยว" }, { value: "ออนไลน์" }, { value: "ทั่วไป" }]
  return (
    <>
      <div className='grid lg:grid-cols-2 lg:gap-2'>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
              เพิ่มข้อมูลการแสดง
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST"
              onSubmit={handleSubmit}
              encType='multipart/form-data' >
              <div>
                <label htmlFor="ticketname" className="block text-sm font-medium leading-6 dark:text-white">
                  ชื่อการแสดง
                </label>
                <div className="mt-2">
                  <input
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
                <label htmlFor="tickettype" className="block text-sm font-medium leading-6 dark:text-white">
                  ประเภทการแสดง
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => handleChange(e)}
                    name='tickettype'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>เลือกประเภทการแสดง</option>
                    {type.map((type, index) =>
                      <option value={type.value}>{type.value}</option>
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="ticketprice" className="block text-sm font-medium leading-6 dark:text-white">
                  ราคาบัตร
                </label>
                <div className="mt-2">
                  <input
                    type='text'
                    required
                    name='ticketprice'
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
                <div className="mt-2">
                  <input
                    name="ticketdesc"
                    type='text'
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
                <div className="mt-2">
                  <input
                    // value={session?.user.nickname}
                    // readOnly
                    name='ticketrepo'
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
                <div className="mt-2">
                  <label htmlFor="ticketimage" className="block text-sm font-medium leading-6 dark:text-white">
                    รูปภาพประกอบ
                  </label>
                  <input
                    name='file'
                    accept='image/*'
                    onInput={(e) => handleChange(e)}
                    multiple
                    className="block w-full rounded-md border-0 py-0.5 dark:text-white shadow-sm ring-1 ring-inset ring-white-300 placeholder:dark:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" aria-describedby="file_input_help" id="file_input" type="file" />

                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  เพิ่มข้อมูล
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
                  </div>
                </>
              )
              : (
                <>
                  <div className='container'>
                    {/* <img
                      className="mx-auto h-auto w-auto"
                      src="https://www.finnomena.com/wp-content/uploads/2016/10/promt-pay-logo.jpg"
                      alt="PromptPay"
                    />
                    <img
                      className="mx-auto h-auto w-auto"
                      src={item.ticketqr}
                      alt="PromptPay"
                    /> */}
                    <h1 className="mt-10 text-center text-2xl font-bold dark:text-white leading-9 tracking-tight text-gray-900">
                      ตัวอย่างรูป
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

export default addTicket