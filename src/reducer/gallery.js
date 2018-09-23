import { createAction, handleActions } from 'redux-actions';

export const actions = {
	setBusy: 'gallery/SET_BUSY',
	unsetBusy: 'gallery/UNSET_BUSY',
	loadImages: 'galery/LOAD_IMAGES',
	setImages: 'gallery/SET_IMAGES'
};

export const setBusy = createAction(actions.setBusy);
export const unsetBusy = createAction(actions.unsetBusy);
export const loadImages = createAction(actions.loadImages);
export const setImages = createaction(actions.setImages);

const defaultState = {
	images: [],
	isBusy: false
};

export default handleActions({
	[actions.setBusy]: (state, action) => ({ ...state, isBusy: true }),
	[actions.unsetBusy]: (state, action) => ({ ...state, isBusy: false }),
	[actions.setImages]: (state, action) => ({ ...state, images: action.payload })
});