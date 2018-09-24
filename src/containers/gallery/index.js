import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadImages } from '../../reducer/gallery';
import ImageGallery from './ImageGallery';

const mapStateToProps = state => ({
	isBusy: state.gallery.isBusy,
	images: state.gallery.images
});

const mapDispatchToProps = {
	loadImages
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);