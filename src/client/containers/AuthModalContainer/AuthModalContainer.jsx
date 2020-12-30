import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { modalStateSelector } from '@app/selectors';
import { closeModal } from '@app/slices/globalSlice';
import { Modal } from '@app/components';
import Register from './Register';

const AuthModalContainer = ({ modal }) => {
  let isOpen = null;
  const dispatch = useDispatch();

  if (modal === 'signup') isOpen = true;
  if (modal === 'signin') isOpen = true;

  function onCloseModal() {
    dispatch(closeModal());
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} contentLabel="Modal">
      <Modal.Header onClose={onCloseModal} />
      <Modal.Content>
        {modal === 'signup' && <Register />}
        {modal === 'signin' && <Register />}
      </Modal.Content>
    </Modal>
  );
};

AuthModalContainer.propTypes = {};

AuthModalContainer.defaultProps = {
  modal: undefined,
};

AuthModalContainer.propTypes = {
  modal: PropTypes.string,
};

const mapStateToProps = (state) => ({
  modal: modalStateSelector(state),
});

export default connect(mapStateToProps)(AuthModalContainer);
