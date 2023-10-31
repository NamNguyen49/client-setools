

// import React from 'react';
// import './sideBar.css';
// import { SidebarData } from './sideBarData';



// import Modalpopup from '../../CreateProject';
// function SideBar({ openDrawer }) {
//   return (
//     <div className='SideBar'>
//       <ul className='SideBarList'>
//         {SidebarData.map((value, key) => {
//           return (
//             <li id={window.location.pathname === value.link ? "Active" : ""} className='row' key={key}
//               onClick={() => {
//                 window.location.pathname = value.link;
//                 openDrawer(false);
//               }}
//             >
//               <div id='icon'>
//                 {value.icon}
//               </div>
//               <div id='title'>{value.titile}</div>
//             </li>
//           );
//         })}


//         <li className='col'>
//           <div id='icon'>


//             <Modalpopup />
//           </div>

//         </li>
//       </ul>
//     </div>
//   );
// }

// export default SideBar;
import React from 'react';
import './sideBar.css';
import { SidebarData } from './sideBarData';

import Modalpopup from '../../CreateProject';

function SideBar({ openDrawer }) {
  const data = SidebarData(); // Gọi SidebarData như một hàm để lấy danh sách dữ liệu

  return (
    <div className='SideBar'>
      <ul className='SideBarList'>
        {data.map((value, key) => { // Sử dụng data thay vì SidebarData
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
              <div id='title'>{value.title}</div> {/* Sửa value.titile thành value.title */}
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
