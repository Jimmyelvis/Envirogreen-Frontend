// components/ui/Alert.js
import React from 'react';
import Image from 'next/image';
import { createPortal } from "react-dom";
import { useSelector } from 'react-redux';
import Icon_success from '@/components/assets/img/icon-alert-success.svg';
import Icon_danger from '@/components/assets/img/icon-alert-danger.svg';
import Icon_info from '@/components/assets/img/icon-alert-info.svg';
import Icon_warning from '@/components/assets/img/icon-alert-warning.svg';

const Alert = () => {
  const {alerts} = useSelector((state) => state.ui); // Use useSelector to get alerts from state

  const showAlerts = alerts.map((alert, index) => (
    <div 
      key={alert.id} 
      className={`alert alert-${alert.alertType}`}
      // style={{ top: `${(index + 1) * 5.5}rem` }}
    >
        <Image
          src={Icon_danger}
          alt="Alert Icon"
          width={30}
          height={30}
          layout='responsive'
          className='alert-icon'
        />

      {alert.msg}
    </div>
  ));

  if (alerts.length > 0) {
    return createPortal(showAlerts, document.querySelector('#alerts'));
  } else {
    return null;
  }
};

export default Alert;

// components/ui/Alert.js beta version
// import React, { useEffect, useState } from 'react';
// import { createPortal } from "react-dom";
// import { useSelector } from 'react-redux';

// const Alert = () => {
//   const { alerts } = useSelector((state) => state.ui);
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     // If there are alerts, activate the class for animation
//     if (alerts.length > 0) {
//       setIsActive(true);
      
//       // Remove active class after the alert is displayed
//       const timeout = setTimeout(() => {
//         setIsActive(false);
//       }, 3000); // Adjust this duration based on your needs

//       return () => clearTimeout(timeout); // Clean up the timeout on unmount
//     }
//   }, [alerts]);

//   const showAlerts = alerts.map((alert, index) => (
//     <div 
//       key={alert.id} 
//       className={`alert alert-${alert.alertType} ${isActive ? 'active' : ''}`}
//       style={{ top: `${(index + 1) * 5.5}rem` }}
//     >
//       {alert.msg}
//     </div>
//   ));

//   if (alerts.length > 0) {
//     return createPortal(
//       <div className={`alerts-container ${isActive ? 'active' : ''}`}>
//         {showAlerts}
//       </div>,
//       document.querySelector('#alerts')
//     );
//   } else {
//     return null;
//   }
// };

// export default Alert;

