import React from "react";
import Link from 'next/link';


const Navbar = ({handleToHome}) => {

    const clickHandler = () => handleToHome();
    return(
        <nav className="w-full bg-gray-50 z-10 borders">
          <ul className='flex justify-end gap-3 p-5'>
            <li className='mr-auto'>
              <Link className='hover:to-blue-600 hover:cursor-pointer' href="/">
                Home
              </Link>
            </li>
            {/* <li>
              <a className='hover:to-blue-600'>
                Report Bugs
              </a>
            </li> */}
            <li>
              <Link className='hover:to-blue-600' href="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
    );
}

export default Navbar;