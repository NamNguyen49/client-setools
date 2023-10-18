import React from 'react'
import './sideBar.css'
import { sideBarData } from './sideBarData'

function SideBar({openDrawer}) {
  return (
    <div className='SideBar'>
      <ul className='SideBarList'>
        {sideBarData.map((value, key) => {
          return (
            <li  id={ window.location.pathname === value.link ? "Active":""} className='row' key={key} 
            onClick={()=> {window.location.pathname = value.link;
              openDrawer(false);                                                                                                          
              }}>
              <div id='icon'>
                {value.icon}
              </div>
              <div id='title'>{value.titile}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default SideBar