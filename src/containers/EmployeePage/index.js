import ContentWrapper from 'commonComponents/ContentWrapper';
import authenticate from 'auth';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmployee, requestDeleteEmployee } from './actions';
import './employeePage.scss';

@authenticate
class Employee extends Component {

  componentDidMount() {
    this.props.getEmployee();
  }

  handleDelete(employeeId) {
    const { token } = this.props;
    this.props.requestDeleteEmployee(token, employeeId);
  }

  render() {
    const { employees } = this.props;
    return (
      <ContentWrapper>
        <div>
          <h1>Employee List</h1>
          <ul className="lst-employee">
            {employees.map((o) => (
              <li key={o.id}>{o.name}
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDelete(o.id)}
                >X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </ContentWrapper>
    );
  }
}

Employee.propTypes = {
  getEmployee: PropTypes.func,
  requestDeleteEmployee: PropTypes.func,
  employees: PropTypes.array,
  token: PropTypes.string,
};

Employee.defaultProps = {
  getEmployee: () => {
  },
  requestDeleteEmployee: () => {
  },
  employees: [],
  token: '',
};

const mapStateToProps = (state) => {
  const { employees } = state.employee;
  const token = state.login ? state.login.token : null;
  return {
    employees,
    token,
  };
};

export default connect(mapStateToProps, { requestDeleteEmployee, getEmployee })(Employee);
