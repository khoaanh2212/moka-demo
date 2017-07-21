import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

const Login = ({ error, handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="login-area">
      <div className="title">Login</div>
      {error ? <div className="error">error</div> : ''}
      <div className="email">
        <Field
          className="inputText"
          name="username"
          component="input"
          required="required"
        />
        <span className="floating-label">Email or Phone</span>
      </div>
      <div className="password">
        <Field
          className="inputText"
          type="password"
          name="password"
          component="input"
          required="required"
        />
        <span className="floating-label">Password</span>
      </div>
      <div className="keep-login">
        <input type="checkbox" />
        <span>Keep me logged in</span>
      </div>
      <button type="submit" className="unset-all biits-btn btn-primary-orange">LOGIN</button>
      <div className="forgot-pw">Forgot your password?</div>
    </div>
  </form>
);

export default reduxForm({
  form: 'login',
})(Login);

Login.defaultProps = {
  error: '',
};
Login.propTypes = {
  error: PropTypes.string,
};
