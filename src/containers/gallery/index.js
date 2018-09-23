import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { loadImages } from '../../reducer/gallery';

class ImageGallery extends Component {

	componentDidMount() {
		this.props.loadImages(this.props.feed);
	}
	
	render() {
		const { isBusy, images } = this.props;

		return (
			<div>
				{isBusy && <div> Loading... </div>}
				{!isBusy && isEmpty(images) && <div> No Images. </div>}
				{!isBusy && !isEmpty(images) && images.map((image, id) => <img src={image.url} />)}
			</div>
		)
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

const mapStateToProps = state => ({
	isBusy: state.gallery.isBusy,
	images: state.gallery.images
});

const mapDispatchToProps = {
	loadImages
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);