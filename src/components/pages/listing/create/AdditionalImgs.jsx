import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Upload_btn from '@/components/assets/img/upload-icon.svg';
import Close_btn from '@/components/assets/img/close-btn-orange.svg';
import { multiUpload } from '@/utils/Cloudinary';

export const AdditionalImgs = ({
  additionalImgs,
  getExtraPhotos,
  removeFromExtraPhotos,
}) => {
  const [images, setImages] = useState([]);

  /*
    Type Checking:

      Use typeof additionalImgs to check if it's a string.
      Use Array.isArray(additionalImgs) to check if it's an array.
      Empty String Handling:

      If additionalImgs is an empty string, set jsonparseImgs to an empty array.
      Parsing the JSON String:

      Only call JSON.parse() if additionalImgs is a non-empty string.
      Error Handling:

      The try-catch block catches any errors that may occur during parsing.
      In the catch block, log the error and set a default value to prevent the app from crashing.
  */

  useEffect(() => {
    if (additionalImgs) {
      setImages(additionalImgs);
    }

    // if (additionalImgs) {
    //   console.log('Raw additionalImgs:', additionalImgs); // Log the input

    //   try {
    //     let jsonparseImgs;

    //     // Check if additionalImgs is a string
    //     if (typeof additionalImgs === 'string') {
    //       // Handle possible empty strings
    //       if (additionalImgs.trim() === '') {
    //         jsonparseImgs = []; // Set to an empty array if the string is empty
    //       } else {
    //         jsonparseImgs = JSON.parse(additionalImgs); // Parse the JSON string
    //       }
    //     } else if (Array.isArray(additionalImgs)) {
    //       // If it's already an array, use it directly
    //       jsonparseImgs = additionalImgs;
    //     } else {
    //       // Handle other unexpected types
    //       jsonparseImgs = [];
    //     }

    //     setImages(jsonparseImgs);
    //   } catch (error) {
    //     console.error('Error parsing JSON:', error);
    //     setImages([]); // Set an empty array or default value on error
    //   }
    // } else {
    //   // Handle the case where additionalImgs is null or undefined
    //   setImages([]);
    // }
  }, [additionalImgs]);

  const submitImages = () => (e) => {
    e.preventDefault();
    const value = e.target.value;

    window.cloudinary.openUploadWidget(multiUpload(), (error, result) => {
      if (error) {
        console.log({
          'An error occured': error,
        });
      } else if (result.event === 'success') {
        console.log('Upload result:', result);
        const newImageUrl = result.info.secure_url;

        // Update local images state
        setImages((prevImages) => [...prevImages, newImageUrl]);

        // Pass the new image to the parent component via getExtraPhotos
        getExtraPhotos(newImageUrl);
      }

      // if (result && result.event === 'success') {
      //   setmainimage(result.info.url);
      //   setImgFile(result.info.path)
      // }
    });
  };

  const removeImgFromArray = (img, index) => {
    setImages(images.filter((image) => image !== img));
    removeFromExtraPhotos(img);
  };

  const renderAdditionalImgs = () => {
    if (images.length > 0) {
      return (
        <div className='imgs-returned'>

          <div className="imgs">
            {images.map((img, index) => {
              return (
                <div key={index} className="additional-img">
                  <Image
                    src={img}
                    width={1000}
                    height={500}
                    alt="Additional Image"
                    layout="responsive"
                  />

                  <Image
                    src={Close_btn}
                    width={100}
                    height={100}
                    alt="Close Button"
                    layout="responsive"
                    className="close-btn"
                    onClick={() => {
                      removeImgFromArray(img);
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="upload-btn">
            <Image
              src={Upload_btn}
              width={100}
              height={100}
              alt="Upload Button"
              layout="responsive"
              className="upload-icon"
              onClick={submitImages()}
            />
            <h3 className="heading-3 upload-instructions">
              Upload additional images for your listing
            </h3>
          </div>
        </div>
      );
    } else {
      return (
        <div className='initial-state'>
          <div className="additional-upload-btn">
            <Image
              src={Upload_btn}
              width={100}
              height={100}
              alt="Upload Button"
              layout="responsive"
              className="upload-icon"
              onClick={submitImages()}
            />
            <h3 className="heading-3 upload-instructions">
              Upload additional images for your listing
            </h3>
          </div>
        </div>
      );
    }
  };

  return (
    // <div className={`${ additionalImgs?.length <= 0 ? 'form-control' : "" }   create-listing_additional-img` }>
    //   {renderAdditionalImgs()}
    // </div>

    <div className={`form-control create-listing_additional-img`}>
      {renderAdditionalImgs()}
    </div>
  );
};
