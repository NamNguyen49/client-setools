// import React from 'react'
// import './sideBar.css'
// import { sideBarData } from './sideBarData'
// import ProjectButton from './ProjectButton';
// function SideBar({openDrawer}) {
//   return (
//     <div className='SideBar'>
//       <ul className='SideBarList'>
//         {sideBarData.map((value, key) => {
//           return (
//             <li  id={ window.location.pathname === value.link ? "Active":""} className='row' key={key} 
//             onClick={()=> {window.location.pathname = value.link;
//               openDrawer(false);                                                                                                          
//               }}>
//               <div id='icon'>
//                 {value.icon}
//               </div>
//               <div id='title'>{value.titile}
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   )
// }

// export default SideBar

import React from 'react';
import './sideBar.css';
import { sideBarData } from './sideBarData';

// Assuming you have a ProjectButton component, import it here
import ProjectButton from '../../ProjectButton';
import Modalpopup from '../../Modalpopup';
function SideBar({ openDrawer }) {
  return (
    <div className='SideBar'>
      <ul className='SideBarList'>
        {sideBarData.map((value, key) => {
          return (
            <li id={window.location.pathname === value.link ? "Active" : ""} className='row' key={key}
              onClick={() => {
                window.location.pathname = value.link;
                openDrawer(false);
              }}
            >
              <div id='icon'>
                {value.icon}
              </div>
              <div id='title'>{value.titile}</div>
            </li>
          );
        })}


        <li className='col'>
          <div id='icon'>


            <Modalpopup />
          </div>

        </li>
      </ul>
    </div>
  );
}

export default SideBar;
