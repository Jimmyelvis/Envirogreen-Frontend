// useModal.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '@/reduxstore/slices/uiSlice';

export function useModal() {
  const dispatch = useDispatch();
  const { isModalOpen, modalContent } = useSelector((state) => state.ui);

  const [modalTarget, setModalTarget] = useState(null);
  const [origin, setOrigin] = useState(null);

  const openModalTarget = (target, originKey) => {
    setModalTarget(target);
    setOrigin(originKey);
    dispatch(openModal(originKey));
  };

  const closeModalTarget = () => {
    dispatch(closeModal());
    setModalTarget(null);
    setOrigin(null);
  };

   // If you want, you can add side effects or other logic here
  // For example, remove body overflow when modal is closed:
  // useEffect(() => {
  //   if (isModalOpen) {
  //     document.body.classList.add('overflow');
  //   } else {
  //     document.body.classList.remove('overflow');
  //   }
  // }, [isModalOpen]);

  return {
    isModalOpen,
    modalContent,
    modalTarget,
    origin,
    openModalTarget,
    closeModalTarget,
  };
}
