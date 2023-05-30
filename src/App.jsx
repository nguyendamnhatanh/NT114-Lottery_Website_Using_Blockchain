// import { Navbar, Welcome, Footer, Services, Transactions } from "./components"
import React, { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home, Profile, LotteryRoom, CreateRoom, TestFeat } from './pages'
import { Navbar, Sidebar } from './components'


const App = () => {

    return (
        <div className="relative sm:-8 p-4  bg-[#2C3333] min-h-screen flex flex-row">
            <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
            </div>
            <div className="flex-1 flex-col flex max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/create-room' element={<CreateRoom />} />
                    <Route path='/lottery-room' element={<LotteryRoom />} />
                    <Route path='/test-feat' element={<TestFeat />} />
                    {/* <Route path='/payment' element={<Payment />} />  */}
                </Routes>
            </div>
        </div>
    )
}
export default App



