import React from 'react';
import PropTypes from 'prop-types';

const LabelInputComponent = ({ lab, name, val, pholder, readonly, type, cname, checked }) => {

  const handleBlur = (event) => {
    if (type === 'number') {
      const value = parseFloat(event.target.value);
      if (!isNaN(value)) {
        const minValue = event.target.min ? parseFloat(event.target.min) : Number.MIN_VALUE;
        const maxValue = event.target.max ? parseFloat(event.target.max) : Number.MAX_VALUE;
        // Implementiere hier deine Min/Max-Validierung
      }
    }
  };

  return (
    <div className={`label-input-component ${cname}`}>
      {lab && <label className="label">{lab}</label>}
      <input
        type={type}
        name={name}
        value={type === 'checkbox' ? undefined : val} // Checkbox verwendet checked statt value
        checked={type === 'checkbox' ? checked : undefined} // Nur Checkbox verwendet checked
        placeholder={pholder || name}
        readOnly={readonly}
        className="input"

       
      />
    </div>
  );
};

LabelInputComponent.propTypes = {
  lab: PropTypes.string,
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pholder: PropTypes.string,
  readonly: PropTypes.bool,
  checked: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'number', 'range', 'email', 'password', 'date', 'checkbox']), // Füge hier weitere Typen hinzu, die du unterstützen möchtest
  cname: PropTypes.string
};

LabelInputComponent.defaultProps = {
  lab: '',
  val: '',
  pholder: '',
  readonly: false,
  checked: false,
  type: 'text',
  cname: ''
};

export default LabelInputComponent;
