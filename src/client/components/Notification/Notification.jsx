import React from 'react';
import PropTypes from 'prop-types';
import { AlertIcon, InfoIcon, CloseIcon } from '@app/components/Icons';

const Notification = ({ type, message, details, closeAlert }) => {
  let className = '';

  if (type === 'error') {
    className += ' bg-danger-100 border-danger-500 text-danger-700';
  }

  if (type === 'success') {
    className += ' bg-success-100 border-success-500 text-success-700';
  }

  if (type === 'warning') {
    className += ' bg-warning-100 border-warning-500 text-warning-700';
  }

  return (
    <div
      className={`w-full z-50  border-b-2 rounded-b  shadow-md p-4 ${className}`}
      role="alert"
    >
      <div className="flex w-full">
        {type === 'success' ? <InfoIcon size="sm" /> : <AlertIcon size="sm" />}

        <div>
          <p className="font-bold pl-2">{message}</p>
          {details && details.length && (
            <p className="text-sm">
              Make sure you know how these changes affect you.
            </p>
          )}
        </div>

        <button
          type="button"
          className="p-2 ml-auto hover:bg-neutral-200"
          onClick={closeAlert}
        >
          <CloseIcon size="xs" />
        </button>
      </div>
    </div>
  );
};

Notification.defaultProps = {
  details: '',
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  closeAlert: PropTypes.func.isRequired,
  details: PropTypes.string,
};

export default Notification;
