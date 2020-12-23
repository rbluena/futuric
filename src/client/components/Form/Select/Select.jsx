import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ size, id, name, options, label, error, ...rest }) => (
  <div className="max-w-sm">
    {label && label.length && (
      <label htmlFor={id} className="text-sm text-primary-700">
        {label}
      </label>
    )}
    <select
      id={id}
      name={name}
      className={` bg-neutral-50 border-b-2  outline-none border-primary-300 focus:border-primary-600 focus:outline-none rounded w-full text-sm leading-tight p-2 ${
        size === 'sm' ? 'py-1' : ''
      }`}
      {...rest}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
    {error && error.length && (
      <span className="text-danger-500 text-xs">{error}</span>
    )}
  </div>
);

Select.defaultProps = {
  error: '',
  label: '',
  options: [],
};

Select.propTypes = {
  /** ID of an input. */
  id: PropTypes.string.isRequired,

  /** Name of a select control. */
  name: PropTypes.string.isRequired,

  /** Label to show for a select control. */
  label: PropTypes.string,

  /** Error to show if is available. */
  error: PropTypes.string,

  /** List of options in key-value pair of label and value. */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

export default Select;
