import React from 'react';
import PropTypes from 'prop-types';
const ProfileCard = ({ imageUrl, name, description }) => (
  <div className="box-header">
    <div className="user-block">
      <img className="img-circle" src={imageUrl} alt="user image" />
      <span className="username">
        <a href="#" style={{ color: '#fff' }}>{ name }</a>
      </span>
      <span className="description" style={{ color: '#fff' }}>
        { description }
      </span>
    </div>
  </div>
  );

ProfileCard.defaultProps = {
  imageUrl: '/lte/dist/img/user1-128x128.jpg',
  description: '',
};

ProfileCard.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default ProfileCard;
