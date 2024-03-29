import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGlobalNotification } from '@app/selectors';
import { Notification } from '@app/components';
import { clearNotification } from '@app/slices/globalSlice';

const NotificationContainer = () => {
  const [notification, setNotification] = useState();
  const dispatch = useDispatch();
  const { message, type } = useSelector(getGlobalNotification);

  function resetNotification() {
    dispatch(clearNotification());
    setNotification(null);
  }

  useEffect(() => {
    if (type && message) {
      if (typeof message === 'string') {
        setNotification({ type, message });
      } else {
        const key = Object.keys(message)[0];
        const msg = message[key];
        setNotification({ type, message: msg });
      }
    }
  }, [type, message]);

  return (
    <div className="fixed w-full z-50">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          closeAlert={resetNotification}
        />
      )}
    </div>
  );
};

export default NotificationContainer;
