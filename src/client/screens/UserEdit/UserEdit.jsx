import React from 'react';
import { ContentWrapper } from '@app/components';
import UserForm from './UserForm';
import UploadProfile from './UploadProfile';

const UserEdit = () => (
  <>
    <ContentWrapper>
      <UploadProfile />
      <UserForm />
    </ContentWrapper>
  </>
);

UserEdit.propTypes = {};

export default UserEdit;
