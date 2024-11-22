import React from 'react'
import ErrorImg from '../../assets/error-img.svg'

const ErrorPage = () => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{height: "100vh"}}>
            <div>
            <h1>
                Something’s wrong here...
            </h1>
            <img src={ErrorImg} alt='error'/>
            </div>
        </div>
    )
}

export default ErrorPage