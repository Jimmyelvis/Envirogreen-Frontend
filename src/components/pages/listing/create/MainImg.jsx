import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Upload_btn from '@/components/assets/img/upload-icon.svg';
import { singleUploadWithCropping } from '@/utils/Cloudinary';
import ChangePhotoIcon from '@/components/assets/img/change-photo.svg';
import DeletePhotoIcon from '@/components/assets/img/delete-photo.svg';
import { checkImgpath } from '@/utils/getImgsrc';


export const MainImg = ({ mainImg, getMainPhoto  }) => {
  const [mainimage, setmainimage] = useState(mainImg);
  const [imgFile, setImgFile] = useState(null);

  const mainImageSubmit = (name) => (e) => {
    e.preventDefault();
    const value = e.target.value;

    window.cloudinary.openUploadWidget(singleUploadWithCropping(), (error, result) => {
      if (error) {
        console.log({
          'An error occured': error,
        });
      }

      if (result && result.event === 'success') {
        setmainimage(result.info.url);
        setImgFile(result.info.path)
        getMainPhoto(result.info.url)
      }
    });
  };

  useEffect(() => {
    if (mainImg) {
      
      let mainImgPath = checkImgpath(mainImg);
      
      console.log('mainImgPath', mainImgPath);
      setmainimage(mainImgPath);
      setImgFile(mainImg);
    }
  }, [mainImg]);


  const clearImages = () => {
    setmainimage(null);
    setImgFile(null);
  }

  const renderMainImg = () => {
    if (mainimage) {
      return (
        <>
          <div className="img_info">
            <h4 className="heading-4 filename">{imgFile}</h4>

            <div className="btns">
              <Image
                src={ChangePhotoIcon}
                alt="change photo"
                className="change_photo"
                layout="responsive"
                width={100}
                height={100}
                onClick={mainImageSubmit('mainphoto')}
              />
              <Image
                src={DeletePhotoIcon}
                alt="delete photo"
                className="delete_photo"
                layout="responsive"
                width={100}
                height={100}
                onClick={() => {
                  clearImages('mainimage');
                }}
              />
            </div>
          </div>
          <div className="overlay"></div>
          <Image
            src={mainimage}
            width={1000}
            height={500}
            alt="Main Image"
            className="main-img"
            layout="responsive"
          />
        </>
      );
    } else {
      return (
        <>
          <div className="upload-btn">
            <Image
              src={Upload_btn}
              width={100}
              height={100}
              alt="Upload Button"
              layout="responsive"
              className="upload-icon"
              onClick={mainImageSubmit('mainimage', setmainimage)}
            />
          </div>
          <h3 className="heading-3 upload-instructions">
            Upload a main image for your listing
          </h3>
        </>
      );
    }
  };

  return (
    <div
      className={`${!mainimage ? `form-control` : ''} create-listing_main-img`}
    >
      {renderMainImg()}
    </div>
  );
};
