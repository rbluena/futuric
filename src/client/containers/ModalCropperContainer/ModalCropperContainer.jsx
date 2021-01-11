import React, { useState } from 'react';
import Cropper from 'react-cropper';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import decode from 'jsonwebtoken';
import { Modal, Button, Avatar } from '@app/components';
import { uploadProfileService } from '@app/services';
import { b64toBlob } from '@app/utils/files';
import { setNotification, clearNotification } from '@app/slices/globalSlice';
import { updateUserSuccess } from '@app/slices/authSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';

const ModalCropperContainer = ({ token }) => {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState();
  const dispatch = useDispatch();

  /**
   * When file is selected.
   * @param {Object} e Event
   */
  const onChange = (e) => {
    dispatch(clearNotification());

    e.preventDefault();
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg'];
    const isValidFileFormat = allowedFiles.includes(files[0].type);

    if (isValidFileFormat) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Wrong image format selected.',
        })
      );
    }
  };

  /**
   * Cropped image.
   */
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  /**
   *
   */
  const uploadImage = async () => {
    try {
      const user = decode(token);
      const blob = await b64toBlob(cropData);

      const formData = new FormData();
      formData.append('media', blob);

      const config = {
        onUploadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // TODO: percentCompleted
        },
      };

      const { data, message } = await uploadProfileService(
        token,
        user.id,
        formData,
        config
      );

      dispatch(updateUserSuccess(data));
      dispatch(setNotification({ type: 'success', message }));
    } catch (err) {
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
    }
  };

  return (
    <Modal isOpen onClose={() => {}} contentLabel="Cropping modal">
      <div className="py-2">
        <div className="w-full flex flex-wrap justify-center items-start p-4">
          <Avatar src={cropData || ''} initials="IMG" size="2xl" />
          <div className="m-2">
            {image && image.length > 0 ? (
              <div className="flex flex-col justify-end">
                <Button variant="primary" outline onClick={getCropData}>
                  Crop image
                </Button>
                <Button size="sm" onClick={uploadImage}>
                  Upload
                </Button>
              </div>
            ) : (
              <button
                className="bg-neutral-100 p-2 px-3 text-sm font-bold cursor-pointer"
                type="button"
              >
                <label htmlFor="file">
                  Choose file
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="hidden"
                    onChange={onChange}
                  />
                </label>
              </button>
            )}
          </div>
        </div>
        <div style={{ minHeight: '150px' }}>
          {image && image.length && (
            <Cropper
              style={{ height: 'auto', width: '100%' }}
              aspectRatio={1}
              dragMode="move"
              src={image}
              viewMode={1}
              guides
              minCropBoxHeight={5}
              minCropBoxWidth={10}
              background={false}
              responsive
              autoCrop
              autoCropArea={0.6}
              cropBoxResizable={false}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          )}
        </div>
      </div>
      {/* {image && image.length && (
        <div className="bg-primary-200">
          <div className="max-w-sm mx-auto py-4">
            <Button size="lg" variant="primary" onClick={getCropData}>
              <span>Crop</span>
            </Button>
          </div>
        </div>
      )} */}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

ModalCropperContainer.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ModalCropperContainer);
