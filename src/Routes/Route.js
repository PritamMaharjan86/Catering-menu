import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home';
import Quoting from '../Pages/Quoting';
import Booking from '../Pages/Booking';

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/quoting' element={<Quoting />} />
                <Route path='/booking' element={<Booking />} />

            </Routes>
        </BrowserRouter>
    )
}
