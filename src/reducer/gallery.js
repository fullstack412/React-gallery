import { createAction, handleActions } from 'redux-actions';

export const actions = {
	setBusy: 'gallery/SET_BUSY',
	unsetBusy: 'gallery/UNSET_BUSY',
	loadImages: 'gallery/LOAD_IMAGES',
	setImages: 'gallery/SET_IMAGES',
	selectImage: 'gallery/SELECT_IMAGE',
	toggleImageModal: 'gallery/TOGGLE_IMAGE_MODAL',
};

export const setBusy = createAction(actions.setBusy);
export const unsetBusy = createAction(actions.unsetBusy);
export const loadImages = createAction(actions.loadImages);
export const setImages = createAction(actions.setImages);
export const selectImage = createAction(actions.selectImage);
export const toggleImageModal = createAction(actions.toggleImageModal);

const defaultState = {
	images: [],
	isBusy: true,
	imagesPerPage: 10,
	autoRotateTime: 4,
	selectedImage: -1,
	bShowImageModal: false,
};

export default handleActions({
	[actions.setBusy]: (state, action) => ({ ...state, isBusy: true }),
	[actions.unsetBusy]: (state, action) => ({ ...state, isBusy: false }),
	[actions.setImages]: (state, action) => ({ ...state, images: action.payload }),
	[actions.selectImage]: (state, action) => ({ ...state, selectedImage: action.payload, bShowImageModal: true }),
	[actions.toggleImageModal]: (state, action) => ({ ...state, bShowImageModal: action.payload }),
}, defaultState);