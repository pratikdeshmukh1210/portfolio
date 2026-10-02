
import React from "react";
import { useSelector } from "react-redux";
import Navbar from '../components/Navbar';
import { Outlet } from "react-router-dom";
const HomeLayout =()=>{
    const { user } = useSelector((state) => state.auth);
    return (
        <div>
            <Navbar user={user} />
            <div className="p-4">
                <Outlet />
            </div>

        </div>
    )
}
export default HomeLayout  ;
