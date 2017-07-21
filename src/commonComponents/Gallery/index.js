import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox from 'react-images';

class Gallery extends Component {
  constructor() {
    super();

    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
    document.querySelector('body').style.overflowY = 'scroll';
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }
  handleClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return;

    this.gotoNext();
  }
  renderGallery() {
    const { images } = this.props;

    if (!images) {
      return <span></span>;
    }

    const gallery = images.map((obj, i) => (
      <a
        href={obj.src}
        className={css(classes.thumbnail, classes.square)}
        key={`thumb-${i}`}
        onClick={(e) => this.openLightbox(i, e)}
      >
        <img
          alt=""
          src={obj.thumbnail}
          className={css(classes.source)}
          style={{
            objectFit: 'cover',
            paddingBottom: 5,
            height: 100,
            width: '95%',
          }}
        />
      </a>
    ));
    return (
      <div
        className={css(classes.gallery)}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {gallery}
      </div>
    );
  }
  render() {
    return (
      <div
        className="section"
        style={{
          maxHeight: 500,
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        { this.renderGallery() }
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.props.images}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClickThumbnail={this.gotoImage}
          onClose={this.closeLightbox}
        />
      </div>
    );
  }
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
  images: PropTypes.array.isRequired,
};

const gutter = {
  small: 2,
  large: 4,
};
const classes = StyleSheet.create({
  gallery: {
    marginRight: -gutter.small,
    overflow: 'hidden',

    '@media (min-width: 500px)': {
      marginRight: -gutter.large,
    },
  },

  // anchor
  thumbnail: {
    boxSizing: 'border-box',
    display: 'block',
    float: 'left',
    lineHeight: 0,
    paddingRight: gutter.small,
    paddingBottom: gutter.small,
    overflow: 'hidden',

    '@media (min-width: 500px)': {
      paddingRight: gutter.large,
      paddingBottom: gutter.large,
    },
  },

  // orientation
  landscape: {
    width: '30%',
  },
  square: {
    paddingBottom: 0,
    width: '150px',

    '@media (min-width: 500px)': {
      paddingBottom: 0,
    },
  },

  // actual <img />
  source: {
    border: 0,
    display: 'block',
    height: 'auto',
    maxWidth: '100%',
    width: 'auto',
  },
});

export default Gallery;
