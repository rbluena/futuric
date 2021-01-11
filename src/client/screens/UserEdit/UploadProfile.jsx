import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@app/slices/globalSlice';
import { getUserSelector } from '@app/selectors';
import { Avatar } from '@app/components';
import { MODALS } from '@app/constants';

const UploadProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  return (
    <div className="flex justify-center mb-2">
      <button type="button" onClick={() => dispatch(openModal(MODALS.cropper))}>
        <Avatar
          src={user.image && user.image.thumbnail}
          initials="AU"
          size="2xl"
        />
      </button>
    </div>
  );
};
export default UploadProfile;
