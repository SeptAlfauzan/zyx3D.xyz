import React from "react";

const Navbar = () => {
    return(
        <nav>
          <ul className='flex justify-end gap-3 mx-10 pt-5 h-1/6'>
            <li className='mr-auto'>
              <a className='hover:to-blue-600'>
                Home
              </a>
            </li>
            <li>
              <a className='hover:to-blue-600'>
                Report Bugs
              </a>
            </li>
            <li>
              <a className='hover:to-blue-600'>
                About
              </a>
            </li>
          </ul>
        </nav>
    );
}

export default Navbar;