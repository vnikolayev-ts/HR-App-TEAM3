import React from 'react';
import PropTypes from 'prop-types';

const LabelInputComponent = ({ lab, name, val, placeholder, readonly, type, cname, checked, onChange }) => {
  return (
    <div className={`label-input-component ${cname}`}>
      {lab && <label className="label">{lab}</label>}
      <input
        type={type}
        name={name}
        value={type === 'checkbox' ? undefined : val} // Checkbox verwendet checked statt value
        checked={type === 'checkbox' ? checked : undefined} // Nur Checkbox verwendet checked
        placeholder={placeholder || name}
        readOnly={readonly}
        className="input"
        onChange={onChange}
      />
    </div>
  );
};

LabelInputComponent.propTypes = {
  lab: PropTypes.string,
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  checked: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'number', 'range', 'email', 'password', 'date', 'checkbox']), // Füge hier weitere Typen hinzu, die du unterstützen möchtest
  cname: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

LabelInputComponent.defaultProps = {
  lab: '',
  val: '',
  placeholder: '',
  readonly: false,
  checked: false,
  type: 'text',
  cname: ''
};

export default LabelInputComponent;
