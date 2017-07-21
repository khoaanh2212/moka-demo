import React from 'react';
import Loader from 'react-loader-advanced';

const CustomLoader = ({ show, children }) => (
  <Loader message={Loading} show={show}>
    {children}
  </Loader>
);

CustomLoader.propTypes = {
  show: React.PropTypes.bool,
  children: React.PropTypes.node.isRequired,
};

CustomLoader.defaultProps = {
  show: false,
};

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Loading = (
  <div className="overlay" style={styles.wrapper}>
    <i className="fa fa-refresh fa-spin"></i>
  </div>
);

export default CustomLoader;
