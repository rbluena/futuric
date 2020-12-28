import React from 'react';
import { Modal } from '@app/components';
import Register from './Register';

const AuthModalContainer = () => (
  <Modal isOpen>
    <Modal.Header />
    <Modal.Content>
      <Register />
    </Modal.Content>
  </Modal>
);

AuthModalContainer.propTypes = {};

export default AuthModalContainer;
