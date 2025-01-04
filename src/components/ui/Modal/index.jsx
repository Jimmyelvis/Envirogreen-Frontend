import React, { useEffect, useState } from "react";
import CloseBtn from '@/components/assets/img/close_button.svg';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from "react-dom";
import { closeModal } from '@/reduxstore/slices/uiSlice';
import Image from "next/image";

const Modal = ({ children, selector, overlayColor, modalTarget, origin, delay, classes, backdropFilter}) => {

  /** A piece of state to determine when we add the .hide css class
   * to the modal. So when we close it, it will fade out gradually
   * instead of instantly
   */
  const [hide, setHide] = useState(false);
  const { isModalOpen, modalContent } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  Modal.defaultProps = {
    transition: "",
  };

  useEffect(() => {

    if (isModalOpen === true) {
       document.body.classList.add("overflow");
    }

    return () => {
       document.body.classList.remove("overflow");
    }
    
  }), [isModalOpen];

  /**
   * Closes the modal by first, setHide to true, which will
   * apply the .hide class for a gradual fade out. Then set the
   * global context state of closeModal which will unmount any
   * children inside of the root_modal portal. Then setHide back
   * to false
   */
  const closeDown = () => {
    
    setHide(true);

    setTimeout(() => {
      dispatch(closeModal());
      setHide(false);
    }, 1000);
  };

  const getClassnames = () => {
    if (isModalOpen === true && origin === modalContent) {
      if (isModalOpen && hide === true) {
        return `modal-overlay  show-modal hide-modal`;
      }

      return `modal-overlay  show-modal ${classes ? classes : ""}`;
    } else {
      return null;
    }
  };



  const content = (
    <>
      <div className={`${getClassnames()}`}  
        style={
          { 
            backgroundColor: `${overlayColor}`,
            transform: `${modalTarget === "search_overlay" ? 
            "none" : "scale(1.0)"}`,
            backdropFilter: `${backdropFilter ? backdropFilter : ""}`,
          }
       }>
        {children}

        <Image
          src={CloseBtn}
          alt="Close Button"
          width={30}
          height={30}
          onClick={closeDown}
          className="close-modal-btn"
          layout="responsive"
        />

   
      </div>
    </>
  );

  /**
   * We will not only check to see if the modal is open, but also
   * if the value of the modalContent prop that is passed in from the modal Redux state, matches the value of the origin prop that is passed in from the component that called the modal. This is to ensure
   that the modal is only rendered when the component that called
    the modal is the one that is currently open.
   */
  return isModalOpen && origin === modalContent ? createPortal(content, document.querySelector(selector)) : null;
};

export default Modal;
