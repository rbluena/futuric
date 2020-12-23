import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@app/components/Icons';

const Sidebar = ({ children, isOpen }) => (
  <aside
    className={`transition-all duration-500 ease-in-out transform max-w-xs overflow-y-scroll ${
      isOpen ? '' : 'translate-x-full'
    }  bg-neutral-50 fixed right-0 top-0 z-50 shadow-lg min-h-screen max-h-screen w-full md:w-2/6`}
  >
    {children}
  </aside>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

Sidebar.Header = ({ children, onClose }) => (
  <div className="flex flex-row  justify-between">
    {children}
    <button type="button" className="" onClick={onClose}>
      <CloseIcon size="sm" />
    </button>
  </div>
);

Sidebar.Header.defaultProps = {
  children: null,
};

Sidebar.Header.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

Sidebar.Content = ({ children }) => (
  <div className="divide-y-2 divide-neutral-200">{children}</div>
);

Sidebar.Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
