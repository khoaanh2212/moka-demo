import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Select from '../Select';

const SelectField = ({ name, options, placeholder, defaultValue, clearable }) => (
  <Field
    name={name}
    component={renderSelect}
    placeholder={placeholder}
    options={options}
    defaultValue={defaultValue}
    clearable={clearable}
  />
);

const renderSelect = ({ input, ...rest, meta: { error, warning }, clearable }) => ( // eslint-disable-line react/prop-types
  <div>
    <Select
      {...input}
      {...rest}
      onChange={(selected) => {
        const value = selected ? selected.value : 0;
        input.onChange(value);
      }}
      value={input.value ? input.value : rest.defaultValue}
      clearable={clearable}
    />
    {((error && <strong className="text-red">{error}</strong>) ||
    (warning && <strong className="text-yellow">{warning}</strong>))}
  </div>
);

SelectField.defaultProps = {
  placeholder: '',
  defaultValue: '',
  clearable: true,
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  clearable: PropTypes.bool,
};


export default SelectField;
