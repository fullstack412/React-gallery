import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { 
	Paper, 
	CircularProgress, 
	TextField, 
	Select, 
	MenuItem,
	FormControl,
	InputLabel,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@material-ui/core';

import { loadImages, setBusy, selectImage, toggleImageModal, switchPage } from '../../reducer/gallery';
import PageWrapper from '../../components/PageWrapper';

const styles = theme => ({
	dialog: {
		width: 700,
		height: 650
	},
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
	pagination: {
		userSelect: 'none',
		alignItems: 'center',
		marginTop: '2rem',
		display: 'flex',
		paddingLeft: 0,
		listStyle: 'none',
		borderRadius: '0.25rem',

		'& > a': {
			display: 'inline-block',
			boxSizing: 'border-box',
			background: 'white',
			color: 'black',
			textDecoration: 'none',
			cursor: 'pointer',
			padding: '0.75rem',
			minWidth: '2.15rem',
			textAlign: 'center',
			borderRadius: 5,
			margin: '0rem 0.2rem',

			'&:focus': {
				outline: 'none'
			}
		}
	}
});

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
			imagesPerPage: 10
		};

		this.updateResults = this.updateResults.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	componentDidMount() {
		this.updateResults();
	}

	updateResults() {
		this.props.loadImages({
			feedUrl: this.props.feed,
			query: this.state.query,
			sortby: this.state.sortby,
			imagesPerPage: this.state.imagesPerPage,
		});
	}
	
	handleChange = name => e => {
		this.setState({
			[name]: e.target.value,
		}, () => this.updateResults());
	}

	openImage = (id) => {
		return (e) => {
			this.props.selectImage(id);
		}
	}

	toggleImageModal = (isShow) => {
		return (e) => {
			this.props.toggleImageModal(isShow);
		}
	}

	selectNextPrevImage = (sign) => {
		return (e) => {
			this.props.selectImage(this.props.selectedImage + sign);
		}
	}

	handlePageChange(data) {
		this.props.switchPage(data.selected)
	}

	render() {
		const { isBusy, images, sorting, search, pagination, selectedImage, showImages, classes } = this.props;

		console.log(showImages)
		return (
			<PageWrapper>
				<Toolbar>
          {search && <TextField
						label="Search by title"
						type="search"
						onChange={this.handleChange('query')}
          />}
          {sorting && <FormControl className={classes.formControl}>
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
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="sort-by">Images per page</InputLabel>
						<Select
							value={this.state.sortby}
							onChange={this.handleChange('imagesPerPage')}
							inputProps={{
								name: 'imagesperpage',
								id: 'images-per-page',
							}}
						>
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={15}>15</MenuItem>
							<MenuItem value={20}>20</MenuItem>
						</Select>
					</FormControl>
        </Toolbar>
				<Paper
					zdepth={2}
					style={{
						position: 'relative',
						marginTop: 20,
					}}
				>
					<PaperHeader>
						{pagination && 
							<ReactPaginate
								containerClassName={classes.pagination}
								pageCount={this.props.totalPages}
								pageRangeDisplayed={1}
								forcePage={this.props.pageNumber}
								marginPagesDisplayed={1}
								previousLabel={"< Previous"}
								nextLabel={"Next >"}
								onPageChange={this.handlePageChange}
							/>
						}
					</PaperHeader>
					{isBusy && <CircularProgress />}
					{
						!isBusy && isEmpty(images) && 
							<Wrapper height={400}>
								<Label> No Images. </Label>
							</Wrapper>
					}
					{
						!isBusy && !isEmpty(images) && showImages.map((image, id) => 
							<Img key={id} src={image.url} alt={'img_'+id} onClick={this.openImage(id)}/>
						)
					}
				</Paper>
				<Dialog
					open={this.props.bShowImageModal}
					onClose={this.toggleImageModal(false)}
				>
					<DialogContent>
						<DialogContentText>
							{images[selectedImage] && images[selectedImage].title}
						</DialogContentText>
						<img src={images[selectedImage] && images[selectedImage].url} alt={'img_'+selectedImage} />
					</DialogContent>
					<DialogActions>						
						{selectedImage > 0 && <Button onClick={this.selectNextPrevImage(-1)} color="primary">
							Prev
						</Button>}
						{selectedImage < images.length && <Button onClick={this.selectNextPrevImage(1)} color="primary">
							Next
						</Button>}
						<Button onClick={this.toggleImageModal(false)} color="primary">
							Close
						</Button>
					</DialogActions>
				</Dialog>
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
	showImages: state.gallery.showImages,
	selectedImage: state.gallery.selectedImage,
	bShowImageModal: state.gallery.bShowImageModal,
	totalPages: state.gallery.totalPages,
	pageNumber: state.gallery.pageNumber,
});

const mapDispatchToProps = {
	loadImages,
	setBusy,
	selectImage,
	toggleImageModal,
	switchPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ImageGallery));