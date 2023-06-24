'use client'
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
const reviewRead = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([])
    const api = process.env.API_ENDPOINT;
  
    useEffect(() => {
      loadData()
  
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
        title: 'ต้องการลบรีวิว',
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
            'Deleted!',
            'You clicked the button!',
            'success'
          )
        }
      })
    }
  return (
    <>
    <div className='mt-2 relative overflow-x-auto '>
      <table className=" mt-2 table col-3 table-hover">
        <thead>
          <tr className='bg-gray-800 text-white dark:text-white '>
            <th scope="col">No
            </th>
            <th scope="col">TicketID</th>
            <th scope="col">UserID</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">วันที่</th>
            <th scope="col">รีวิวโดย</th>
            <th scope="col">แสดง</th>
            <th scope="col">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {item.map((res, index) => (
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
                    onClick={() => handleDelete(res.revid)}
                    type="button" 
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">ลบ</button>


                {/* <Link
                  className="col-6"
                  href={"Employee/editticket/" + res.ticketid}
                  >
                  <i className="bi bi-pencil-square text-warning"></i>
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  )
}

export default reviewRead