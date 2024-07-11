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
  onChange
}) => {
  return (
    <div className={`label-input-component ${cname}`}>
      {lab && <label className="label">{lab}</label>}
      {type === 'checkbox' ? (
        
      <input
          type="checkbox"
          name={name}
          checked={checked}
          className="input-checkbox"
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={val}
          placeholder={placeholder || name}
          readOnly={readonly}
          className="input"
          onChange={onChange}
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
  type: PropTypes.oneOf(['text', 'number', 'range', 'email', 'password', 'date', 'checkbox']), // Füge hier weitere Typen hinzu, die du unterstützen möchtest
  cname: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default LabelInputComponent;
