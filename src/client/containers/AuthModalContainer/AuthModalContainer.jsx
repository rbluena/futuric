import React, { useState } from 'react';
import { Modal } from '@app/components';
import Register from './Register';

const AuthModalContainer = () => {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Header onClose={closeModal} />
      <Modal.Content>
        <Register />
      </Modal.Content>
    </Modal>
  );
};

AuthModalContainer.propTypes = {};

export default AuthModalContainer;
