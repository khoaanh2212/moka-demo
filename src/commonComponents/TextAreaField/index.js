import React, { PropTypes } from 'react';
import { Field } from 'redux-form';

class TextAreaField extends React.Component {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
  }

  renderInput(field) {
    const { input, meta: { error, warning }, type, disabled, defaultValue } = field;
    return (
      <div>
        <textarea
          className="form-control"
          {...input}
          type={type}
          value={input.value ? input.value : defaultValue}
          disabled={disabled}
          style={{ resize: 'none' }}
        />
        {((error && <strong className="text-red">{error}</strong>) ||
        (warning && <strong className="text-yellow">{warning}</strong>))}
      </div>
    );
  }
  render() {
    const { name, disabled, defaultValue, type } = this.props;
    return (
      <Field
        name={name}
        component={this.renderInput}
        defaultValue={defaultValue}
        type={type}
        disabled={disabled}
      />
    );
  }
}

TextAreaField.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

TextAreaField.defaultProps = {
  name: '',
  defaultValue: '',
  disabled: false,
  type: 'text',
};
export default TextAreaField;
