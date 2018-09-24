import React, { Component } from 'react';

import ImageGallery from './ImageGallery';

export default class MyGallery extends Component {

	render() {
		return (<ImageGallery feed="feed.json" />);
	}
}