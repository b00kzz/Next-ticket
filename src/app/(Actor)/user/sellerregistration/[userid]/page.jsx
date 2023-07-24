"use client"
import Registration from '@/components/Registration'
import StatusModal from '@/components/StatusModal';
import axios from 'axios'
import { useParams } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'

const SellerRegistration = () => {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [item, setItem] = useState({});
    // console.log("🚀 ~ file: page.jsx:10 ~ SellerRegistration ~ item:", item)
    const api = process.env.API_ENDPOINT;
    const { userid } = useParams()

    useEffect(() => {
        loadDataByid()
    }, [])

    const loadDataByid = async () => {
        const response = await axios.get(api + `userdetail/${userid}`)
            .then((res) => {
                setItem(res.data)
                setIsLoaded(true)
            }).catch(err => {
                // setError(err)
            })
    }
    return (
        <>
            <Fragment>
                {item.recordstatus === "รออนุมัติ" ? <StatusModal status={"รออนุมัติ"} detail={item} />
                    : item.recordstatus === "ไม่ผ่านการอนุมัติ" ? <StatusModal status={"ไม่ผ่านการอนุมัติ"} detail={item} />
                        : <Registration userdetail={item} />
                }
            </Fragment>
        </>
    )
}

export default SellerRegistration