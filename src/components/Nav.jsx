"use client"
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from "next-auth/react";
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link'
import axios from 'axios'
import { AiFillHome } from 'react-icons/ai'
import LineNotifyModal from './LineNotifyModal'
// import './globals.css'


const navigation = [
  { name: 'หน้าแรก', href: '/', current: true, icon: <AiFillHome /> },
  { name: 'รีวิว', href: '/review', current: false, icon: 'home' },
  { name: 'ซื้อสินค้า', href: '/product', current: false, icon: 'home' },
  { name: 'ติดต่อ', href: '/contact', current: false, icon: 'home' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({})
  const { data: session } = useSession()
  const api = process.env.API_ENDPOINT;

  useEffect(() => {
    // loadData(userid)
  }, []);

  const loadData = async (userid) => {
    const response = await axios.get(api + "user/" + userid)
      .then(res => {

        setUser(res.data)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
        // console.log(err);
      })
  }
  // console.clear()
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Disclosure as="nav" className="bg-transparent">
        {/* <Disclosure as="nav" className="bg-zinc-900"> old*/}
        {({ open }) => (
          <>
            <Fragment>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-blue-500 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start sm:items-stretch sm:justify-start">
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'text-blue-500 hover:bg-blue-600 hover:text-white' : 'text-blue-500 hover:bg-blue-600 hover:text-white',
                              'rounded-md px-3 py-2 font-bold text-md'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                    {/* Profile dropdown */}
                    <p className='text-blue-500 hover:text-blue-900 font-bold dark:text-white'><span>{session?.user.nickname}</span> </p>

                    {session?.user
                      ? (<Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={session?.user.avatar}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={session?.user.roleid === 'Admin' ? '/admin/manage' : '/' && session?.user.roleid === 'Employee' ? '/employee/manage/' + session?.user.userid : '/' && session?.user.roleid === 'User' ? '/user/history/' + session.user.userid : ''}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  {session?.user.roleid === 'Admin' ? 'หน้าแอดมิน' : session?.user.roleid === 'Employee' ? 'จัดการบัตร' : session?.user.roleid === 'User' ? 'ประวัติการทำรายการ' : ''}
                                </Link>
                              )}
                            </Menu.Item>
                            {session?.user.roleid === 'Employee' || session?.user.roleid === 'User' &&
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href={session?.user.roleid === 'Employee' ? '/employee/manage/' + session?.user.userid : '/' && session?.user.roleid === 'User' ? '/user/history/' + session.user.userid : ''}
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    {session?.user.roleid === 'Employee' ? 'แก้ไขข้อมูลผู้ขาย' : session?.user.roleid === 'User' ? 'ลงทะเบียนเป็นผู้ขาย' : ''}
                                  </Link>
                                )}
                              </Menu.Item>
                            }
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  onClick={() => setShowModal(true)}
                                  href={'#notify'}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  รับการแจ้งเตือนผ่านไลน์
                                </Link>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={"/changepassword/" + session?.user.userid}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  เปลี่ยนรหัสผ่าน
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={"/profile/" + session?.user.userid}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  ตั้งค่าโปรไฟล์
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="/"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                                >
                                  ออกจากระบบ
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>)
                      : (
                        <div>
                          <Link
                            type="button"
                            href="/login"
                            className="PersonIcon rounded-full bg-blue-600 p-1 text-white hover:text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            onClick={() => signIn({ callbackUrl: '/', redirect: true })}
                          >
                            <PersonIcon />
                            เข้าสู่ระบบ
                          </Link>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-blue-600 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
              <LineNotifyModal isOpen={showModal} onClose={() => setShowModal(false)} />
            </Fragment>
          </>
        )}

      </Disclosure>

    </>
  )
}
