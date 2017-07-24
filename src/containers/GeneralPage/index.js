import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from 'commonComponents/ContentWrapper';
import authenticate from 'auth';
import { connect } from 'react-redux';

import { requestGetEmployee, requestDeleteEmployee, requestGetUser, requestDeleteUser } from './actions';

@authenticate
class General extends Component {

  componentWillMount() {
    this.props.requestGetEmployee();
    this.props.requestGetUser();
  }

  handleDeleteEmployee(id) {
    const { token } = this.props;
    this.props.requestDeleteEmployee(token, id);
  }

  handleDeleteUser(id) {
    const { token } = this.props;
    this.props.requestDeleteUser(token, id);
  }

  render() {
    const { employees, users } = this.props;
    return (
      <ContentWrapper>
        <div>
          <h1>Total List</h1>
          <ul className="lst-employee">
            {employees.map((o) => (
              <li key={o.id}>{o.name}
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDeleteEmployee(o.id)}
                >X
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="lst-employee">
            {users.map((o) => (
              <li key={o.id}>{o.name}
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDeleteUser(o.id)}
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

General.propTypes = {
  requestGetEmployee: PropTypes.func,
  requestGetUser: PropTypes.func,
  requestDeleteEmployee: PropTypes.func,
  requestDeleteUser: PropTypes.func,
  token: PropTypes.string,
  employees: PropTypes.array,
  users: PropTypes.array,
};

General.defaultProps = {
  requestGetEmployee: () => {
  },
  requestGetUser: () => {
  },
  requestDeleteEmployee: () => {
  },
  requestDeleteUser: () => {
  },
  token: null,
  employees: [],
  users: [],
};

const mapStateToProps = (state) => {
  const { employees } = state.general ? state.general.employee : [];
  const { users } = state.general ? state.general.user : [];
  return {
    token: state.login ? state.login.token : null,
    employees,
    users,
  };
};

export default connect(mapStateToProps, {
  requestGetEmployee,
  requestDeleteEmployee,
  requestGetUser,
  requestDeleteUser,
})(General);
