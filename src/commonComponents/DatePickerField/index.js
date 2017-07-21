import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import DatePicker from 'react-bootstrap-date-picker';

const DatePickerField = ({ name, disabled }) => (
  <Field
    name={name}
    component={({ input }) =>
    (<DatePicker
      disabled={disabled}
      dateFormat="DD/MM/YYYY"
      value={input.value}
      onChange={(val) => input.onChange(val)}
    />)}
  />
);

DatePickerField.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

DatePickerField.defaultProps = {
  name: '',
  disabled: false,
};

export default DatePickerField;
