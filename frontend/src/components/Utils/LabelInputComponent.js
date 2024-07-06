import React from 'react';
import PropTypes from 'prop-types';

const LabelInputComponent = ({ lab, name, val, pholder, readonly, type, cname }) => {

 



  const handleBlur = (event) => {
    // Validierung für number mit Min/Max
    if (type === 'number') {
      const value = parseFloat(event.target.value);
      if (!isNaN(value)) {
        const minValue = event.target.min ? parseFloat(event.target.min) : Number.MIN_VALUE;
        const maxValue = event.target.max ? parseFloat(event.target.max) : Number.MAX_VALUE;
        
        
      }
    }
    // Weitere Validierungen für andere Typen können hier hinzugefügt werden

  };

  return (
    <div className={`label-input-component ${cname}`}>
      {lab && <label className="label" >{lab}:</label>}
      <input 
        type={type}
        name={name}
        value={val}
        pholder={pholder || name}
        readOnly={readonly}
        className="input"
        style={{ padding: '5px', margin: '5px' }}
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
  type: PropTypes.oneOf(['text', 'number', 'range', 'email', 'password', 'date']), // Füge hier weitere Typen hinzu, die du unterstützen möchtest
  cname: PropTypes.string,
  onChange: PropTypes.func
};

LabelInputComponent.defaultProps = {
  label: '',
  val: '',
  pholder: '',
  readonly: false,
  type: 'text',
  cname: ''
};

export default LabelInputComponent;
