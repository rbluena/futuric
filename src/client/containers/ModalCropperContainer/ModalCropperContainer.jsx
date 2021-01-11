import React, { useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { decode } from 'jsonwebtoken';
import { Modal, Button, Avatar } from '@app/components';
import { uploadProfileService } from '@app/services';
import { b64toBlob } from '@app/utils/files';
import {
  setNotification,
  clearNotification,
  closeModal,
} from '@app/slices/globalSlice';
import { updateUserSuccess } from '@app/slices/authSlice';
import { MODALS } from '@app/constants';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';

const ModalCropperContainer = ({ token, modal }) => {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState();
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  /**
   * When file is from local storage.
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
   * Crop box change the position
   */
  const cropEnd = () => {
    setCropData(null);
  };

  /**
   * Uploading image to the server
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

          setProgress(percentCompleted);
        },
      };

      if (user) {
        const { data, message } = await uploadProfileService(
          token,
          user._id,
          formData,
          config
        );

        dispatch(updateUserSuccess(data.jwt));
        dispatch(setNotification({ type: 'success', message }));
      }
    } catch (err) {
      setProgress(0);
      const error = {
        type: 'error',
        message: err.errors,
      };
      dispatch(setNotification(error));
    }
  };

  useEffect(() => {
    if (progress === 100) {
      dispatch(closeModal());
    }
    return () => {
      setImage(null);
      setCropper(null);
      setCropData(null);
      setProgress(0);
    };
  }, [progress, dispatch]);

  return (
    <Modal
      isOpen={modal === MODALS.cropper}
      onClose={() => dispatch(closeModal())}
      contentLabel="Cropping modal"
    >
      <Modal.Header onClose={() => dispatch(closeModal())} />
      <Modal.Content>
        <div className="py-2">
          <div className="w-full flex flex-wrap justify-center items-start p-4">
            <Avatar
              src={cropData || ''}
              initials="IMG"
              size="2xl"
              alt="profile"
              square
            />

            {/* start: UPLOAD BUTTONS */}
            <div className="m-2">
              {image && image.length > 0 ? (
                <div className="flex flex-col justify-end">
                  <Button
                    variant="primary"
                    outline
                    onClick={getCropData}
                    className="mb-2"
                  >
                    Crop image
                  </Button>

                  {cropData && cropData.length && (
                    <Button size="sm" onClick={() => uploadImage()}>
                      Upload
                    </Button>
                  )}
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
            {/* end: UPLOAD BUTTONS */}

            {/* start: PROGRESS BAR */}
            <div className="h-2 w-full bg-neutral-400 rounded-lg mt-2">
              <div
                className="bg-primary-400 h-2 rounded-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* end: PROGRESS BAR */}
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
                cropend={cropEnd}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
            )}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  modal: state.global.modal,
});

ModalCropperContainer.defaultProps = {
  token: undefined,
  modal: undefined,
};

ModalCropperContainer.propTypes = {
  token: PropTypes.string,
  modal: PropTypes.string,
};

export default connect(mapStateToProps)(ModalCropperContainer);
