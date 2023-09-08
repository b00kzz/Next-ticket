'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import '../register/register.css'
import { useState } from 'react'
import Swal from 'sweetalert2'



const Register = () => {
  const { data: session } = useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const api = process.env.API_ENDPOINT;

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (username === '' || password === '' || email === '' || nickname === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields',
      })
    } else if (username.length > 3 || password.length > 3 || email.length > 3 || nickname.length > 3) {
      Swal.fire({
        title: 'ต้องการยืนยันการลงทะเบียน?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ยืนยัน',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await fetch(api + "register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              nickname: nickname,
              email: email,
            }),
          });
          const data = await resp.json();
          if (data.code === "80001") {
            //console.log(data.message); // "System Error"
            //console.log(data.description); // "Cannot save user"
            // ใส่โค้ดที่คุณต้องการทำหลังจากสมัครไม่สำเร็จที่นี่
            try {
              Swal.fire(
                'ลงทะเบียนไม่สำเร็จ!',
                'เนื่องจากมีผู้ใช้นี้ในระบบแล้ว',
                'warning'
              ).then(() => {
                window.location.replace('/register')
              })
            } catch (error) {
              console.log("🚀 ~ file: page.jsx:56 ~ handleSubmit ~ error:", error)
            }
          } else {
            // กรณีอื่นๆ ที่สมัครไม่สำเร็จ
            // ใส่โค้ดที่คุณต้องการทำหลังจากสมัครไม่สำเร็จที่นี่
            Swal.fire(
              'สำเร็จ!',
              'ระบบได้ทำการลงทะเบียนเรียบร้อยแล้ว',
              'success'
            ).then(() => {
              window.location.replace('/')
            })
          }
        }
      })
    }
  }

  return (
    <>
      {
        session?.user.roleid !== "Admin"
          ? (
            <>
              {session?.user ? (
                window.location.replace('/')
              ) : (
                <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[100%] h-[30%]">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
                      แบบฟอร์มลงทะเบียนสมาชิก
                    </h2>
                  </div>

                  <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 dark:text-white">
                          ชื่อผู้ใช้
                        </label>
                        <div className="mt-1">
                          <input
                            type='text'
                            placeholder='กรอกชื่อผู้ใช้'
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-white">
                          รหัสผ่าน
                        </label>
                        <div className="mt-1">
                          <input
                            type='password'
                            placeholder='กรอกรหัสผ่าน'
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="nickname" className="block text-sm font-medium leading-6 dark:text-white">
                          ชื่อเล่น
                        </label>
                        <div className="mt-1">
                          <input
                            type='text'
                            placeholder='กรอกรชื่อเล่น'
                            onChange={(e) => setNickname(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-white">
                            อีเมล
                          </label>
                        </div>
                        <div className="mt-1">
                          <input
                            placeholder='กรอกรอีเมล'
                            id="email"
                            type='email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          สมัครสมาชิก
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )
              }
            </>

          )
          : (
            <>
              <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-[100%] h-[30%]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  {/* <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  /> */}
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
                    แบบฟอร์มลงทะเบียนสมาชิก
                  </h2>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium leading-6 dark:text-white">
                        ชื่อผู้ใช้
                      </label>
                      <div className="mt-1">
                        <input
                          type='text'
                          placeholder='กรอกชื่อผู้ใช้'
                          onChange={(e) => setUsername(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-white">
                        รหัสผ่าน
                      </label>
                      <div className="mt-1">
                        <input
                          type='password'
                          placeholder='กรอกรหัสผ่าน'
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nickname" className="block text-sm font-medium leading-6 dark:text-white">
                        ชื่อเล่น
                      </label>
                      <div className="mt-1">
                        <input
                          type='text'
                          placeholder='กรอกรชื่อเล่น'
                          onChange={(e) => setNickname(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-white">
                          อีเมล
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          placeholder='กรอกรอีเมล'
                          id="email"
                          type='email'
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        สมัครสมาชิก
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </>
          )
      }
    </>

  )

}

export default Register