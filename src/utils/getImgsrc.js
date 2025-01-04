import { network } from '@/helpers/constants';

export const imgsrc = (src) => {
  return (
      src.fullpic_path
      ? `${network.img}${src.fullpic_path}`
      : src.main_photo ? src.main_photo : 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1733599811/misc/jinjoe_httpss.mj.runqGnJ94r_4kE_3d_minimalistic_icon_of_a_hou_4037b756-d646-4a0d-8f91-d3c3d8e8588c_0.png'
    )
}

export const checkImgpath = (imagePath) => {
  // Check if the imagePath starts with '/images/houses/'
  if (imagePath.startsWith('/images/houses/')) {
    return `${network.img}${imagePath}`; // Prepend network.img to the imagePath
  } else if (imagePath.startsWith('/images/interiors/')) {
    return `${network.img}${imagePath}`; // Prepend network.img to the imagePath
  }
  
  return imagePath; // Return the original path if it doesn't match
};

  /*
    A Listing may have have an older version of the extra photos array
    where each extra photo is stored in a separate field. This function
    checks if the listing has the new array format and returns the extra
    photos in the new format. If the listing has the old format, it returns the extra photos in the old format.
  */
export const parseExtraPhotos = (src) => {

  let extraPhotos = [];

  if (src.extraphotos !== null) {

    /*
      Laravel stores the extra photos as a JSON string in the database, when using the current format. So we need to parse the JSON string to get the extra photos.
    */

    
    try {
      extraPhotos = JSON.parse(src.extraphotos);
    } catch (error) {
      console.error('Error parsing extraphotos:', error);
    }
  } 
  
  if (src.extrapicone_path) {
    extraPhotos.push(`${network.img}${src.extrapicone_path}`);
  }
  if (src.extrapictwo_path) {
    extraPhotos.push(`${network.img}${src.extrapictwo_path}`);
  }
  if (src.extrapicthree_path) {
    extraPhotos.push(`${network.img}${src.extrapicthree_path}`);
  }
  if (src.extrapicfour_path) {
    extraPhotos.push(`${network.img}${src.extrapicfour_path}`);
  }

  return extraPhotos;
  
}