"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'moment/min/locales';

const checkSlip = () => {
  const { payid } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([])
  const api = process.env.API_ENDPOINT;

  useEffect(() => {
    loadData(payid)
  }, [])

  const loadData = async (payid) => {
    const response = await axios.get(api + "payment/" + payid)
      .then(res => {
        setItem(res.data)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
        // console.log(err);
      })

  }
  console.clear()
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
          รายละเอียดการซื้อ
        </h2>
        <br />
      </div>
      <div className='mb-4 grid grid-cols-2 gap-2'>
        {item.payslip !== "" &&
          <div>
            <img className="flex-center h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter hover:grayscale"
              src={item.payslip} />
          </div>
        }
        {item.payslip === "" &&
          <>
            <p className='justify-center mt-6 text-center text-sm leading-9 tracking-tight dark:text-white'>เกิดข้อผิดพลาดเนื่องจากไม่พบการชำระเงิน</p>
          </>
        }
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 dark:text-white">
                  ชื่อผู้ซื้อ:
                </label>
                <div>
                  <input
                    value={item.createdby}
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 font-bold text-center  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 dark:text-white">
                  ชื่อการแสดง:
                </label>
                <div className="mt-2">
                  <input
                    value={item.ticketname}
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 font-bold text-center text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 dark:text-white">
                  ราคาบัตร:
                </label>
                <div className="mt-2">
                  <input
                    value={item.ticketprice}
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 font-bold text-center  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 dark:text-white">
                  รายละเอียดตั๋ว:
                </label>
                <div className="mt-2">
                  <input
                    value={item.ticketdesc}
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5  font-bold text-center text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 dark:text-white">
                  ซื้อเวลา:
                </label>
                <div className="mt-2">
                  <input
                    value={moment(item.createddate).locale('th').format('lll' + ' น.')}
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5  font-bold text-center  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {item.updatedby !== null &&
                <div>
                  <label htmlFor="nickname" className="block text-sm font-medium leading-6 dark:text-white">
                    เวลาอัพเดต:
                  </label>
                  <div className="mt-2 items-center">
                    <input
                      value={moment(item.updateddate).locale('th').format('lll' + ' น.')}
                      readOnly
                      className="block w-full rounded-md border-0 py-1.5 text-black font-bold text-center  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default checkSlip