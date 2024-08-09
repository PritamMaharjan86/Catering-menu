import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    const handleClick = (id) => {
        if (id === 'quote')
            navigate('/quoting');
        else {
            navigate('/booking');
        }
    }

    return (
        <div>
            <h1 className='title'> Barbehaus Catering</h1>
            <p className='text'>What would you like to do? </p>
            <br />
            <button id='quote' className='button' onClick={() => handleClick('quote')}>Create Quote</button> <br />
            <button id='book' className='button' onClick={() => handleClick('book')}>Book Catering</button>
        </div>
    )
}
