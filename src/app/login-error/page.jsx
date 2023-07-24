import React, { Fragment } from 'react'
import Login from '../login/page'
import LoginFail from '@/components/LoginFail'

const loginErr = () => {
    return (
        <div>
            <Fragment>
                <Login />
                <LoginFail/>
            </Fragment>
        </div>
    )
}

export default loginErr