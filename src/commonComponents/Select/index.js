import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import _ from 'lodash';
import './customSelectStyle.css';


class CustomSelect extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    if (fetchData) {
      fetchData();
    }
  }

  render() {
    const { fetchData, onChange, creatable, onNewOptionClick } = this.props;
    const { options = [], value, disabled = false, multi = false, clearable = true } = this.props;

    const handleInputChange = _.debounce((input) => {
      const flag = options.some((o) => o.label.includes(input));
      if (!flag) {
        fetchData(input);
      }
    }, 200);
    if (creatable) {
      return (
        <Select.Creatable
          className={`custom-select ${this.props.className}`}
          disabled={disabled}
          value={value}
          options={options}
          onChange={(e) => onChange(e)}
          onInputChange={handleInputChange}
          placeholder={this.props.placeholder}
          onNewOptionClick={onNewOptionClick}
          clearable={clearable}
        />
      );
    }
    return (
      <Select
        className={`custom-select ${this.props.className}`}
        disabled={disabled}
        value={value}
        options={options}
        onChange={(e) => onChange(e)}
        onInputChange={handleInputChange}
        placeholder={this.props.placeholder}
        multi={multi}
        clearable={clearable}
      />
    );
  }
}

CustomSelect.defaultProps = {
  options: [],
  value: undefined,
  disabled: false,
  placeholder: 'Gõ vào để tìm kiếm...',
  className: '',
  fetchData: () => {},
  onChange: () => {},
  creatable: false,
  onNewOptionClick: () => {},
  multi: false,
  clearable: true,
};

CustomSelect.propTypes = {
  options: React.PropTypes.array,
  value: React.PropTypes.any,
  placeholder: React.PropTypes.string,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  fetchData: React.PropTypes.func,
  onChange: React.PropTypes.func,
  creatable: React.PropTypes.bool,
  onNewOptionClick: React.PropTypes.func,
  multi: React.PropTypes.bool,
  clearable: React.PropTypes.bool,
};

export default CustomSelect;
