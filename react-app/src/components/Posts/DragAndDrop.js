import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './draganddrop.css'
const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const DragAndDrop = ({ setImages, images, setImageLoading }) => {
  const [files, setFiles] = useState([])


  const onDrop = useCallback(acceptedimages => {
    console.log(acceptedimages)
    for(let i = 0;images.length;i++){
      images.shift()
    }
    let newimages = [...images]



    for (let acceptedimage of acceptedimages) {
      console.log(acceptedimage)
      if (images.length === 0) {
        newimages.push(acceptedimage)
        setImages(newimages);
      }
      for (let image of images) {
        console.log(typeof image.name)

        if (image.name !== acceptedimage.name) {
          newimages.push(acceptedimage)
          setImages(newimages);
        }
      }
    }


    acceptedimages.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))







    console.log(images)




    setFiles([...files, ...acceptedimages]);
    console.log(files)


  }, [images, setImages, files]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div key={file.name} className="preview-image">
      <img
        width='50px'
        src={file.preview}
        alt={file.name}
      />
    </div>
  ));

  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));

  }, [files]);



  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps({

        })} />
        <div>Drag and drop your images here.</div>
      </div>
      <aside>
        {thumbs}
      </aside>
    </section>
  )
}

export default DragAndDrop
