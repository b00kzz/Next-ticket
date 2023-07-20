'use client'
import ReviewModal from '@/components/ReviewModal';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import React, { Fragment, useEffect, useState } from 'react'
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
const reviewRead = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({})
  const [userid, setUserid] = useState("");
  const [item, setItem] = useState([])
  const [query, setQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const revrank5 = item.filter(rev => rev.revrank === "5").length;
  const revrank4 = item.filter(rev => rev.revrank === "4").length;
  const revrank3 = item.filter(rev => rev.revrank === "3").length;
  const revrank2 = item.filter(rev => rev.revrank === "2").length;
  const revrank1 = item.filter(rev => rev.revrank === "1").length;
  const api = process.env.API_ENDPOINT;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    loadData();
    return () => {
      clearInterval(timer);
    };
  }, [])

  const loadData = async () => {
    const response = await axios.get(api + "reviews")
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
    setQuery(prop);
  };

  async function handleChangesST(e, revid) {
    const status = e.target.checked;

    //   console.log({ status }, revid);
    axios.put(api + "review/status/" + revid, { status })
      .then(res => {
        // console.log(res);
        loadData();
      })

  }


  async function handleDelete(revid) {
    Swal.fire({
      title: 'ต้องการลบรีวิว ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(api + "review/" + revid)
          .then(res => {
            loadData();
          })
        Swal.fire(
          'สำเร็จ!',
          'ลบรีวิวเรียบร้อยแล้ว!',
          'success'
        )
      }
    })
  }
  return (
    <>
      <Fragment>
        <div className="stats shadow flex-center">
          <div className="stat place-items-center">
            <div className="stat-title">จำนวนรีวิวทั้งหมด</div>
            <div className="stat-value">{item.length}</div>
            <div className="stat-desc">เวลาอ้างอิง: {currentTime.toLocaleTimeString()}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">คะแนนระดับสูง</div>
            <div className="stat-value text-secondary">{revrank5}</div>
            <div className="stat-desc text-secondary flex-center">
              อยู่ในระดับ 5 ดาว
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">คะแนนระดับปานกลาง</div>
            <div className="stat-value">{revrank3 + revrank4}</div>
            <div className="stat-desc flex-center">
              อยู่ในระดับ 3 - 4 ดาว
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">คะแนนระดับน้อย</div>
            <div className="stat-value text-secondary">{revrank1 + revrank2}</div>
            <div className="stat-desc text-secondary">อยู่ในระดับ 1-2 ดาว</div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2 mt-6'>
          <h2 className="text-2xl lg:font-bold tracking-tight dark:text-white xs:text-md xs:font-medium">รีวิวแดชบอร์ด</h2>
          <div className="flex-center dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="mr-2">
                <button onClick={() => setQuery("5")} className="bg-sky-600/10 inline-flex p-4 border-b-2 border-transparent rounded-t-lg  hover:border-sky-600 dark:hover:text-gray-300 group" >
                  ระดับ 5 <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </button>
              </li>
              <li className="mr-2">
                <button onClick={() => setQuery("4")} className="bg-sky-600/10 inline-flex p-4 border-b-2 border-transparent rounded-t-lg  hover:border-sky-600 dark:hover:text-gray-300 group">
                  ระดับ 4 <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </button>
              </li>
              <li className="mr-2">
                <button onClick={() => setQuery("3")} className="bg-sky-600/10 inline-flex p-4 border-b-2 border-transparent rounded-t-lg  hover:border-sky-600 dark:hover:text-gray-300 group">
                  ระดับ 3 <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>

                </button>
              </li>
              <li className="mr-2">
                <button onClick={() => setQuery("2")} className="bg-sky-600/10 inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:border-sky-600 dark:hover:text-gray-300 group">
                  ระดับ 2  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>

                </button>
              </li>
              <li className="mr-2">
                <button onClick={() => setQuery("1")} className="bg-sky-600/10 inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:border-sky-600 dark:hover:text-gray-300 group">
                  ระดับ 1  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>

                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-2 relative overflow-x-auto '>
          <table className=" mt-2 table col-3 table-hover">
            <thead>
              <tr className='bg-gray-800 text-white dark:text-white '>
                <th scope="col">ลำดับ
                </th>
                <th scope="col">รหัสตั๋ว</th>
                <th scope="col">รหัสผู้ใช้</th>
                <th scope="col">รายละเอียด</th>
                <th scope="col">วันที่</th>
                <th scope="col">รีวิวโดย</th>
                <th scope="col">แสดง</th>
                <th scope="col">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {item.map((res, index) => (
                res.revrank.toLowerCase().includes(query.toLowerCase()) &&
                <tr key={index + 1} className='dark:text-white whitespace-nowrap bg-slate-300/30 hover:bg-violet-100'>
                  <th scope="row">{index + 1}</th>
                  <td>{res.ticketid}</td>
                  <td>{res.userid}</td>
                  <td>
                    {res.revcomment}
                  </td>
                  <td>
                    {moment(res.createddate).locale('th').format('lll' + ' น.')}
                  </td>
                  <td>
                    {res.createdby}
                  </td>
                  <td>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox" value={res.status}
                        className="sr-only peer" checked={res.status}
                        onChange={(e) => handleChangesST(e, res.revid)}

                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                    </label>
                  </td>
                  <td>
                    <button
                      onClick={() => {setUserid(res.userid),setData(res),setShowModal(true)}}
                      
                    >
                      <FaSearch className="ml-2 text-sky-600"></FaSearch>
                    </button>

                    <button onClick={() => handleDelete(res.revid)}>
                      <FaTrashAlt className="ml-4 text-danger"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReviewModal isOpen={showModal} onClose={() => setShowModal(false)} data={data}/>
      </Fragment>
    </>
  )
}

export default reviewRead