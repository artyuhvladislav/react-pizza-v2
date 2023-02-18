import React, { ChangeEvent } from 'react';
import styles from './UserFileImg.module.scss';

export const UserFileImg = () => {
  const [uploadedImg, setUploadedImg] = React.useState('');

  const handleUploadImg = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setUploadedImg(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div>
      <input
        className={styles.input}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleUploadImg}
      />
      <div className={styles.rootImg}>
        {uploadedImg ? (
          <img className={styles.img} src={uploadedImg} alt="uploadedImg" />
        ) : (
          <img
            className={styles.img}
            src={'https://api-private.atlassian.com/users/fde38e21a4a7753e776d5736c986a9f0/avatar'}
            alt="uploadedImg"
          />
        )}
      </div>
    </div>
  );
};
