import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { modalStateSelector, linksStateSelector } from '@app/selectors';
import { closeModal } from '@app/slices/globalSlice';
import { Modal } from '@app/components';
import { MODALS } from '@app/constants';
import Stats from './Stats';

const StatsModalContainer = ({ modal }) => {
  const dispatch = useDispatch();
  const { activeLink } = useSelector(linksStateSelector);

  let isOpen = false;
  if (modal === MODALS.linkStats) isOpen = true;

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
        <Stats
          comments={activeLink.commentsCount}
          views={activeLink.visits}
          waitlist={activeLink.waitingsCount}
        />
      </Modal.Content>
    </Modal>
  );
};

StatsModalContainer.propTypes = {
  modal: PropTypes.string,
};

StatsModalContainer.defaultProps = {
  modal: undefined,
};

const mapStateToProps = (state) => ({
  modal: modalStateSelector(state),
});

export default connect(mapStateToProps)(StatsModalContainer);
