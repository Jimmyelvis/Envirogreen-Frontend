import { useMemo } from 'react';
import 'quill/dist/quill.snow.css';
import { singleUploadWithCropping } from '@/utils/Cloudinary';




export const imageHandler = (quillRef) => {
  if (window.cloudinary) {
    window.cloudinary.openUploadWidget(
      singleUploadWithCropping(),
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', result.info.secure_url);
          quill.setSelection(range.index + 1);
        }
      }
    );
  }
};

export const getQuillModules = (quillRef) => ({
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }],
      ['clean'],
    ],
    handlers: {
      image: () => {
        imageHandler(quillRef)
      },
    },
  },
});

// quill.js
// export const getQuillModules = (quillRef) => ({
//   toolbar: {
//     container: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//       ['link', 'image'],
//       [{ align: [] }],
//       ['clean'],
//     ],
//     handlers: {
//       image: imageHandler(quillRef),
//     },
//   },
// });



// export const imageHandler = (quillRef) => {
//   return () => {
//     if (window.cloudinary) {
//       window.cloudinary.openUploadWidget(
//         singleUploadWithCropping(),
//         (error, result) => {
//           if (!error && result && result.event === 'success') {
//             console.log('quillRef.current:', quillRef.current);
//             const quill = quillRef.current.getEditor();
//             const range = quill.getSelection(true);
//             quill.insertEmbed(range.index, 'image', result.info.secure_url);
//             quill.setSelection(range.index + 1);
//           }
//         }
//       );
//     }
//   };
// };







export const QuillFormats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];



// export const QuillModules = {
//   toolbar: [
//       [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
//       [{ size: [] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image', 'video'],
//       ['clean'],
//       ['code-block']
//   ],
 
// };

// export const QuillFormats = [
//   'header',
//   'font',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'link',
//   'image',
//   'video',
//   'code-block'
// ];

