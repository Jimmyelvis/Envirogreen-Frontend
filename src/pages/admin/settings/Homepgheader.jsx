import React, { useState, useEffect } from 'react';
import { DashLayout } from '@/components/pages/dashboard/Layout';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeHomepageHeader,
  resetStatus,
  fetchHomepageSettings,
} from '@/reduxstore/slices/settingsSlice';
import { Sectionheading } from '@/components/ui/headings/Sectionheading';
import { MainImg } from '@/components/pages/dashboard/Settings/MainImg';
import { Success_panel } from '@/components/pages/dashboard/Create_Edit/Success_panel';
import { openModal } from '@/reduxstore/slices/uiSlice';
import Modal from '@/components/ui/Modal';
import { useModal } from '@/components/ui/Modal/hooks/useModal';
import { Button } from '@/components/ui/buttons';

const Homepgheader = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState(null);

  const { modalTarget, origin, openModalTarget, closeModalTarget } = useModal();

  const homepageHeader = useSelector((state) => state.settings.homepageHeader);

  const editStatus = useSelector((state) => state.settings.editStatus);

  const modalOpen = useSelector((state) => state.ui.isModalOpen);

  // const checkTarget = () => {
  //   if (modalTarget === 'success') {
  //     return <Success_panel msg={'Changes saved successfully!'} source={'settings'} />;
  //   }
  // };

  // useEffect(() => {
  //   if (modalOpen) {
  //     openModalTarget('success');
  //   }
  // }, [modalOpen]);

  

  const getMainPhoto = (photo) => {
    setUrl(photo);
  };

  useEffect(() => {
    dispatch(fetchHomepageSettings());
  }, [dispatch]);

  useEffect(() => {
    if (homepageHeader) {
      setUrl(homepageHeader);
    }
  }, [homepageHeader]);

  useEffect(() => {
    if (editStatus === 'success') {
      // openModalTarget('success');
      dispatch(fetchHomepageSettings());
      dispatch(resetStatus());
    }
  }, [editStatus]);

  return (
    <DashLayout>
      <div className="settings-pg">
        <Sectionheading heading="Adjust Home Page Header" />

        <MainImg mainImg={url} getMainPhoto={getMainPhoto} />

        <Button
          classes="btn btn-primary-grad btn-save"
          onClick={() => {
            dispatch(changeHomepageHeader(url));
          }}
        >
          Save Changes
        </Button>
      </div>
    </DashLayout>
  );
};

export default Homepgheader;
