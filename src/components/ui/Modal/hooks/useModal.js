// useModal.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, setModalContent } from '@/reduxstore/slices/uiSlice';

export function useModal() {
  const dispatch = useDispatch();
  const { isModalOpen, modalContent } = useSelector((state) => state.ui);

  const [modalTarget, setModalTarget] = useState(null);
  const [origin, setOrigin] = useState(null);

  const openModalTarget = (target, originKey) => {
    setModalTarget(target);
    setOrigin(originKey);
    dispatch(openModal(originKey));
    // dispatch(setModalContent(target));
  };

  const closeModalTarget = () => {
    dispatch(closeModal());
    setModalTarget(null);
    setOrigin(null);
  };

  return {
    isModalOpen,
    modalContent,
    modalTarget,
    origin,
    openModalTarget,
    closeModalTarget,
  };
}
