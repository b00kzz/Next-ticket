"use client"
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/min/locales';
import { useParams } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';

const history = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const [query, setQuery] = useState("");
  const api = process.env.API_ENDPOINT;
  const { userid } = useParams()

  useEffect(() => {
    // loadData()
    loadDataId(userid)
  }, [])

  const loadDataId = async (userid) => {
    const response = await axios.get(api + "payments/user/" + userid)
      .then(res => {
        setItem(res.data)
        setIsLoaded(true)

      }).catch(err => {
        setError(err)
        // console.log(err);
      })
  }

  const handleSearch = async (e) => {
    const prop = e.target.value;
    // console.log(prop);
    setQuery(e.target.value);
  }


  async function handleDelete(payid) {
    Swal.fire({
      title: 'ต้องการลบรายการหรือไม่',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(api + "payment/" + payid)
          .then(res => {
            loadDataId(userid);
          })
        Swal.fire(
          'Deleted!',
          'You clicked the button!',
          'success'
        )
      }
    })
  }

  return (
    <>
      <div className="mt-2 container px-4 h-full mx-auto">
        <div className='grid grid-cols-2 gap-2'>
          <p className="mt-3 text-2xl font-bold text-center dark:text-white">ประวัติการทำรายการ</p>
          <form className="mt-3 flex items-center">
            <label htmlFor="simple-search" className="sr-only">ค้นหารายการ</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input type="text" id="simple-search" onChange={handleSearch} value={query} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ค้นหารายการ" required />
            </div>
            <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

              <label>ค้นหา</label>
            </button>
          </form>
        </div>
        <div className="mt-2 relative overflow-x-auto">
          <table className="w-full text-left text-gray-500 dark:text-white">
            <thead className="text-xs text-white uppercase bg-gray-800 text-center rounded">
              <tr className="border-b">
                <th scope="col" className="px-6 py-3">
                  ลำดับ
                </th>
                <th scope="col" className="px-6 py-3">
                  ชื่อรายการ
                </th>
                <th scope="col" className="px-6 py-3">
                  วันที่ซื้อ
                </th>
                <th scope="col" className="px-6 py-3">
                  ราคา (THB)
                </th>
                <th scope="col" className="px-6 py-3">
                  ผลการซื้อ
                </th>
                <th scope="col" className="px-6 py-3">
                  เข้าชม
                </th>
                <th scope="col" className="px-6 py-3">
                  รีวิวรายการ
                </th>
                <th scope="col" className="px-6 py-3">
                  ลบรายการ
                </th>
              </tr>
            </thead>
            {item.map((res, index) => (
              res.ticketname.toLowerCase().includes(query.toLowerCase()) &&
              <tbody className="border-b hover:bg-violet-100 text-center" key={index}>
                <tr className="border-b  whitespace-nowrap dark:text-white">
                  <th scope="row">
                    {index + 1}
                  </th>
                  <td scope="row" className="px-6 py-3">
                    {res.ticketname}
                  </td >
                  <td className="px-6 py-3">
                    {moment(res.createddate).locale('th').format('ll')}
                  </td>
                  <td className="px-6 py-3">
                    {res.ticketprice}
                  </td>

                  <td className="px-6 py-3">
                    <div >
                      <div className="p-1 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                        <span className="flex rounded-full bg-red-950 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
                        <span className="font-semibold mr-2 text-left flex-auto">{res.paymentstatus}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    {res.paymentstatus === "ทำรายการสำเร็จ"
                      ? (
                        <Link
                          href={res.ticketrepo}
                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >เข้าชม
                        </Link>
                      )
                      : (
                        <button
                          href="#"
                          disabled
                          className='text-white bg-blue-500 cursor-not-allowed font-bold py-2 px-4 rounded'
                        >รอเข้าชม
                        </button>
                      )
                    }
                  </td>
                  <td>
                    {res.paymentstatus === "ทำรายการสำเร็จ"
                      ? (
                        <Link href={"/user/review/" + res.ticketid}
                          className='hover:text-amber-400'
                        ><i className="bi bi-star text-warning"></i>  รีวิวรายการนี้</Link>
                      )
                      : (
                        <button
                          href="#"
                          disabled
                          className='dark:text-white cursor-not-allowed'
                        >รอผลการซื้อ
                        </button>
                      )
                    }
                  </td>
                  <td className="px-6 py-3" >
                    <button onClick={() => handleDelete(res.payid)}>
                    <FaTrashAlt className="text-danger"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  )
}

export default history