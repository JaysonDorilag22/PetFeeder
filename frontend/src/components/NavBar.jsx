import React from 'react';
import { MdOutlineWaterDrop, MdOutlineMonitorWeight, MdOutlineFoodBank  } from "react-icons/md";
import { PiBowlFoodBold } from "react-icons/pi";
import { IoLogoOctocat } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
function NavBar() {
  return (
    <div>
      <div className='pb-5 text-5xl font-bold text-yellow-400'>Pet Feeder</div>

      <ul className="menu menu-horizontal bg-yellow-300 rounded-box ">
        <li className="flex flex-col items-center">
          <Link to="/watersensor" className="flex items-center">
            <MdOutlineWaterDrop className='h-5 w-5'/>
            <span className="ml-1">Water</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link to="/loadcellweight" className="flex items-center">
            <MdOutlineMonitorWeight className='h-5 w-5'/>
            <span className="ml-1">Weight</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link to="/loadcellfood" className="flex items-center">
            <PiBowlFoodBold className='h-5 w-5'/>
            <span className="ml-1">Food</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link to="/rfidscanner" className="flex items-center">
            <IoLogoOctocat className='h-5 w-5'/>
            <span className="ml-1">Cat</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link to="/phsensor" className="flex items-center">
            <MdOutlineWaterDrop className='h-5 w-5'/>
            <span className="ml-1">Ph</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link to="/ultrasonic" className="flex items-center">
            <MdOutlineFoodBank  className='h-5 w-5'/>
            <span className="ml-1">Food Storage</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link to="/ultrasonic" className="flex items-center">
            <FaHouse  className='h-5 w-5'/>
            <span className="ml-1">Home</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
