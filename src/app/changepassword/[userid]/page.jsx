"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { PiPasswordFill } from 'react-icons/pi'
import Swal from 'sweetalert2'

const Password = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { userid } = useParams()

  const handleSubmit = async (e) => {
    console.log(password, confirmPassword, userid)
    e.preventDefault()
    if (password === confirmPassword) {
      const res = await axios.put(process.env.API_ENDPOINT + 'password/' + userid, { password }).then(res => {
        Swal.fire({
          title: 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว',
          icon: 'success',
          allowOutsideClick: false,
          confirmButtonColor: "green",
          confirmButtonText: 'กลับไปหน้าแรก'
        }).then(async (result) => {
          if (result.isConfirmed){
            window.location.href = '/'
          }
        })
      })
    } else {
      Swal.fire({
        title: 'กรุณาตรวจสอบรหัสอีกครั้ง',
        icon: 'warning',
        confirmButtonColor: "red",
        confirmButtonText: 'ตกลง'
      })
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div
          className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md"
        >
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            เปลี่ยนรหัสผ่าน
          </div>
          <div className="mt-10">
            <form method="PUT" action="#" onSubmit={handleSubmit}>
              <div className="flex flex-col mb-2">
                <label
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  New Password:
                </label>
                <div className="relative">
                  <div
                    className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                  >
                    <span>
                      <PiPasswordFill className="text-blue-500" />
                    </span>
                  </div>
                  <input
                    id="onepassword"
                    type="password"
                    name="password"
                    // value={confirmPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="รหัสผ่านใหม่"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <label
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Confirm Password:
                </label>
                <div className="relative">
                  <div
                    className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                  >
                    <span>
                      <PiPasswordFill className="text-blue-500" />
                    </span>
                  </div>
                  <input

                    id="twopassword"
                    type="password"
                    name="password"
                    // value={password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                  />
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in "
                >
                  <span className="mr-2 uppercase">เปลี่ยนรหัสผ่าน</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Password