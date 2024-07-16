import React from 'react';
import PropTypes from 'prop-types';

const LabelInputComponent = ({
  lab,
  name,
  val,
  placeholder = '',
  readonly = false,
  type = 'text',
  cname = '',
  checked = false,
  min,
  max,
  onChange
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validierung für numerische Eingaben mit min und max
    if (type === 'number') {
      if (value !== '' && (parseFloat(value) < min || parseFloat(value) > max)) {
        alert(`Value must be between ${min} and ${max}.`);
        return;
      }
    }

    onChange(e); // Aufruf der übergebenen onChange-Funktion
  };

  return (
    <div className={`label-input-component ${cname}`}>
      {lab && <label className="label">{lab}</label>}
      {type === 'checkbox' ? (
        <input
          type="checkbox"
          name={name}
          checked={checked}
          className="input-checkbox"
          onChange={handleChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={val}
          placeholder={placeholder || name}
          readOnly={readonly}
          className="input"
          onChange={handleChange}
          min={min}
          max={max}
        />
      )}
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
  type: PropTypes.oneOf(['text', 'number', 'range', 'email', 'password', 'date', 'checkbox']),
  cname: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default LabelInputComponent;
