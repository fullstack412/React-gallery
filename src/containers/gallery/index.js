import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {

	componentDidMount() {

	}
	
	render() {

	}
}

ImageGallery.propTypes = {
	feed: PropTypes.string.isRequired,
	search: PropTypes.bool,
	pagination: PropTypes.bool,
	resultsPerPage: PropTypes.number,
	sorting: PropTypes.bool,
	autoRotateTime: PropTypes.number
}