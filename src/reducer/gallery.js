import { createAction, handleActions } from 'redux-actions';

export const actions = {
	setBusy: 'gallery/SET_BUSY',
	unsetBusy: 'gallery/UNSET_BUSY',
	loadImages: 'gallery/LOAD_IMAGES',
	setImages: 'gallery/SET_IMAGES',
	selectImage: 'gallery/SELECT_IMAGE',
	toggleImageModal: 'gallery/TOGGLE_IMAGE_MODAL',
	setTotalPages: 'gallery/SET_TOTAL_PAGES',
	switchPage: 'gallery/SWITCH_PAGE',
	setImagesPerPage: 'gallery/SET_IMAGES_PER_PAGE',
};

export const setBusy = createAction(actions.setBusy);
export const unsetBusy = createAction(actions.unsetBusy);
export const loadImages = createAction(actions.loadImages);
export const setImages = createAction(actions.setImages);
export const selectImage = createAction(actions.selectImage);
export const toggleImageModal = createAction(actions.toggleImageModal);
export const setTotalPages = createAction(actions.setTotalPages);
export const switchPage = createAction(actions.switchPage);
export const setImagesPerPage = createAction(actions.setImagesPerPage);

const defaultState = {
	images: [],
	isBusy: true,
	imagesPerPage: 10,
	autoRotateTime: 4,
	selectedImage: -1,
	bShowImageModal: false,
	totalPages: 0,
	pageNumber: 0,
	showImages: [],
};

export default handleActions({
	[actions.setBusy]: (state, action) => ({ ...state, isBusy: true }),
	[actions.unsetBusy]: (state, action) => ({ ...state, isBusy: false }),
	[actions.setImages]: (state, action) => ({ ...state, images: action.payload }),
	[actions.selectImage]: (state, action) => ({ ...state, selectedImage: action.payload, bShowImageModal: true }),
	[actions.toggleImageModal]: (state, action) => ({ ...state, bShowImageModal: action.payload }),
	[actions.setTotalPages]: (state, action) => ({ ...state, totalPages: action.payload }),
	[actions.setImagesPerPage]: (state, action) => ({ ...state, imagesPerPage: action.payload }),
	[actions.switchPage]: (state, action) => {
		const { totalPages, images, imagesPerPage } = state;

		let pageNum = totalPages < action.payload ? 0 : action.payload;
		let pageImages = images.slice(pageNum * imagesPerPage, imagesPerPage + pageNum * imagesPerPage);

		return { ...state, showImages: pageImages, pageNumber: pageNum };
	},
}, defaultState);