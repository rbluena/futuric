import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { modalStateSelector, linksStateSelector } from '@app/selectors';
import { closeModal } from '@app/slices/globalSlice';
import { Modal } from '@app/components';
import { MODALS } from '@app/constants';
import ActivateLink from './ActivateLink';

const ActivateLinkModalContainer = ({ modal }) => {
  const dispatch = useDispatch();
  const { activeLink } = useSelector(linksStateSelector);

  let isOpen = false;
  if (modal === MODALS.linkActivate) isOpen = true;

  /**
   *
   */
  function onCloseModal() {
    dispatch(closeModal());
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      contentLabel="Statistic Modal"
    >
      <Modal.Header onClose={onCloseModal} />
      <Modal.Content>
        <ActivateLink activeLink={activeLink} />
      </Modal.Content>
    </Modal>
  );
};

ActivateLinkModalContainer.propTypes = {
  modal: PropTypes.string,
};

ActivateLinkModalContainer.defaultProps = {
  modal: undefined,
};

const mapStateToProps = (state) => ({
  modal: modalStateSelector(state),
});

export default connect(mapStateToProps)(ActivateLinkModalContainer);
