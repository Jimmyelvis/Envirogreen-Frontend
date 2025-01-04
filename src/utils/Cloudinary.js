export const singleUploadWithCropping = () => {

  const localSettings = {
    multiple: false,
    cropping: true,
  }

  let regSettings =  uploadFile();

  return {
    ...regSettings,
    ...localSettings
  };


};

export const multiUpload = () => {

  const localSettings = {
    multiple: true,
    cropping: false,
  }

  let regSettings =  uploadFile();
  
  return {
    ...regSettings,
    ...localSettings
  }

};

const uploadFile = () => {
  
  return {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOADPRESENT,
    sources: [
      "local",
      "url",
      "camera",
      "facebook",
      "instagram",
      "image_search",
    ],
    googleApiKey: process.env.NEXT_PUBLIC_googleApiKey,
    showAdvancedOptions: true,
    defaultSource: "local",
    styles: {
      palette: {
        window: "#0265ba",
        sourceBg: "#FFFFFF",
        windowBorder: "#0265ba",
        tabIcon: "#FFFFFF",
        inactiveTabIcon: "#3ba5f7",
        menuIcons: "#034398",
        link: "#5BA6E6",
        action: "#5333FF",
        inProgress: "#5BA6E6",
        complete: "#048A53",
        error: "#cc3333",
        textDark: "#034398",
        textLight: "#ffffff",
      },
      fonts: {
        default: null,
        "'Poppins', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Poppins",
          active: true,
        },
      },
    },
  };
  }




// export const Widgetsetting = () => {

//   return {
//     cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
//     uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOADPRESENT,
//     multiple: true,
//     cropping: false, 
//     sources: [
//       "local",
//       "url",
//       "camera",
//       "facebook",
//       "instagram",
//       "image_search",
//     ],
//     googleApiKey: process.env.NEXT_PUBLIC_googleApiKey,
//     showAdvancedOptions: true,
//     defaultSource: "local",
//     styles: {
//       palette: {
//         window: "#0265ba",
//         sourceBg: "#FFFFFF",
//         windowBorder: "#0265ba",
//         tabIcon: "#FFFFFF",
//         inactiveTabIcon: "#3ba5f7",
//         menuIcons: "#034398",
//         link: "#5BA6E6",
//         action: "#5333FF",
//         inProgress: "#5BA6E6",
//         complete: "#048A53",
//         error: "#cc3333",
//         textDark: "#034398",
//         textLight: "#ffffff",
//       },
//       fonts: {
//         default: null,
//         "'Poppins', sans-serif": {
//           url: "https://fonts.googleapis.com/css?family=Poppins",
//           active: true,
//         },
//       },
//     },
//   };


// };


