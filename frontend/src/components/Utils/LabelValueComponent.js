import React from 'react';
import PropTypes from 'prop-types';

const LabelValueComponent = ({ label, value, className }) => {
  return (
    <div className={`label-value-component ${className}`}>
      {label && <span className="label">{label}</span>}
      <span className="value">{value}</span>
    </div>
  );
};

LabelValueComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
  className: PropTypes.string
};

LabelValueComponent.defaultProps = {
  label: '',
  className: ''
};

export default LabelValueComponent;
