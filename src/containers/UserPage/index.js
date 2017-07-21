import React, { Component } from 'react';
import ContentWrapper from 'commonComponents/ContentWrapper';
import authenticate from 'auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, requestDeleteUser } from './actions';


@authenticate
class User extends Component {

  componentDidMount() {
    this.props.getUser();
  }

  handleDelete(id) {
    const { token } = this.props;
    this.props.requestDeleteUser(token, id);
  }

  render() {
    const { users } = this.props;
    return (
      <ContentWrapper>
        <div>
          <h1>User List</h1>
          <ul className="lst-employee">
            {users.map((o) => (
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

User.propTypes = {
  token: PropTypes.string,
  users: PropTypes.array,
  requestDeleteUser: PropTypes.func,
  getUser: PropTypes.func,
};

User.defaultProps = {
  token: '',
  users: [],
  requestDeleteUser: () => {
  },
  getUser: () => {
  },
};

const mapStateToProps = (state) => {
  const { users } = state.user;
  const token = state.login ? state.login.token : null;
  return {
    users,
    token,
  };
};

export default connect(mapStateToProps, { requestDeleteUser, getUser })(User);
