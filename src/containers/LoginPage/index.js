import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from 'components/LoginPage/Login';
import PropType from 'prop-types';

import { loginRequest, authRequest } from './actions';
import './loginPage.scss';


class LoginPage extends Component {

  render() {
    const { loginRequest, authRequest } = this.props;
    return (<div className="login-wrapper">
      <div className="login">
        <div className="col-md-12 login-part no-padding">
          <Login
            onSubmit={authRequest}
          />
        </div>
        <div className="clearfix"></div>
      </div>
    </div>);
  }
}

/* const LoginPage = ({loginRequest}) => (
 <div className="login-wrapper">
 <div className="login">
 <div className="col-md-12 login-part no-padding">
 <Login
 onSubmit={loginRequest}
 />
 </div>
 <div className="clearfix"></div>
 </div>
 </div>
 ); */

LoginPage.propTypes = {
  loginRequest: PropType.func,
  authRequest: PropType.func,
};

LoginPage.defaultProps = {
  loginRequest: () => {
  },
  authRequest: () => {
  },
};

export default connect(undefined, {
  loginRequest, authRequest,
})(LoginPage);
