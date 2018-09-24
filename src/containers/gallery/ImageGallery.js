import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { 
	Paper, 
	CircularProgress, 
	TextField, 
	Select, 
	MenuItem,
	FormControl,
	InputLabel
} from '@material-ui/core';

import { loadImages, setBusy } from '../../reducer/gallery';
import PageWrapper from '../../components/PageWrapper';

const Toolbar = styled.div`
	display: flex;
	align-items: center;
`;
const PaperHeader = styled.div`
  padding: 10px 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px rgba(153, 153, 153, 0.7);
`;
const Wrapper = styled.div`
  height: ${props => props.height}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
	width: 24% !important;
	margin: 5px;
	height: 250px;
`;
const Label = styled.label`
  line-height: 48px;
  height: 48px;
  width: 100%;
  padding-right: 12px;
  text-align: center;
`;
class ImageGallery extends Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			sortby: 'title',
		};

		this.updateResults = this.updateResults.bind(this);
	}

	componentDidMount() {
		this.updateResults();
	}

	updateResults() {
		this.props.loadImages({
			feedUrl: this.props.feed,
			query: this.state.query,
			sortby: this.state.sortby
		});
	}
	
	handleChange = name => e => {
		this.setState({
			[name]: e.target.value,
		}, () => this.updateResults());
	}

	render() {
		const { isBusy, images, sorting, search, pagination } = this.props;

		return (
			<PageWrapper>
				<Toolbar>
          {search && <TextField
						label="Search by title"
						type="search"
						onChange={this.handleChange('query')}
          />}
          {sorting && <FormControl>
						<InputLabel htmlFor="sort-by">Sort by</InputLabel>
						<Select
							value={this.state.sortby}
							onChange={this.handleChange('sortby')}
							inputProps={{
								name: 'sort',
								id: 'sort-by',
							}}
						>
							<MenuItem value={'title'}>Title</MenuItem>
							<MenuItem value={'date'}>Date</MenuItem>
						</Select>
					</FormControl>}
        </Toolbar>
				<Paper
					zdepth={2}
					style={{
						position: 'relative',
						marginTop: 20,
					}}
				>
					<PaperHeader>
					</PaperHeader>
					{isBusy && <CircularProgress />}
					{
						!isBusy && isEmpty(images) && 
							<Wrapper height={400}>
								<Label> No Images. </Label>
							</Wrapper>
					}
					{
						!isBusy && !isEmpty(images) && images.map((image, id) => 
							<Img key={id} src={image.url} alt={'img_'+id}/>
						)
					}
				</Paper>
			</PageWrapper>
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
	images: state.gallery.images,
});

const mapDispatchToProps = {
	loadImages,
	setBusy
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);