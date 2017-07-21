/*
 * Using to authenticate any component before rendering
 */
import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { push } from 'react-router-redux';


const authenticate = (Component) => {
  class CheckAuthenticate extends React.Component {
    componentDidMount() {
      if (this.props.token == null) {
        this.props.dispatch(push('/login'));
      }
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  CheckAuthenticate.propTypes = {
    token: PropType.string,
  };

  CheckAuthenticate.defaultProps = {
    token: null,
  };

  const mapStateToProps = (state) => ({
    token: state.login ? state.login.token : null,
  });
  return connect(mapStateToProps)(CheckAuthenticate);
};

export default authenticate;
