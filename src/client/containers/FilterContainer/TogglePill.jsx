import React from 'react';
import PropTypes from 'prop-types';

const TogglePill = ({ label, checked, value, onChange, ...rest }) => {
  let toggleClass = 'text-neutral-600';

  if (checked) {
    toggleClass = 'bg-neutral-700 text-white';
  }

  return (
    <label
      htmlFor={value}
      className={`cursor-pointer rounded-sm text-sm  px-1 mx-1 hover:bg-neutral-700 hover:text-white whitespace-nowrap ${toggleClass}`}
    >
      {label}
      <input
        type="checkbox"
        name={value}
        id={value}
        value={value}
        onChange={onChange}
        checked={checked}
        style={{ display: 'none' }}
        {...rest}
      />
    </label>
  );
};

TogglePill.defaultProps = {
  checked: false,
};

TogglePill.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TogglePill;
