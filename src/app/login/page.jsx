"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { BsFillPersonFill } from "react-icons/bs"
import { PiPasswordFill } from "react-icons/pi"


export default function Login() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      const res = await signIn("credentials", {
        username,
        password,
      });
    } catch (err) {
      Swal.fire(
        "Username or Password is incorrect",
        "plase try again",
        "warning"
      );
    }
  };

  return (
    <>
      {session?.user ? (
        window.location.replace("/")
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div
            className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md"
          >
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              Welcome
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              กรุณากรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบ
            </div>
            <div className="mt-10">
              <form method="POST" action="#" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-5">
                  <label
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    ชื่อผู้ใช้:
                  </label>
                  <div className="relative">
                    <div
                      className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                    >
                      <BsFillPersonFill className="text-blue-500" />
                    </div>
                    <input
                      id="text"
                      type="text"
                      name="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-6">
                  <label
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                  >
                    รหัสผ่าน:
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
                      id="password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                <div className="flex w-full">
                  <button
                    type="submit"
                    className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in "
                  >
                    <span className="mr-2 uppercase">เข้าสู่ระบบ</span>
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
          <div className="flex justify-center items-center mt-6">
            <a
              href="#"
              target="_blank"
              className="inline-flex items-center text-gray-700 font-medium text-xs text-center"
            >
              <span className="ml-2">หากยังไม่มีบัญชี?</span>
            </a>
            <a href="/register" className="text-xs ml-2 text-blue-500 font-semibold">
              สมัครตอนนี้
            </a>
          </div>
        </div>
      )}
    </>
  );
}
