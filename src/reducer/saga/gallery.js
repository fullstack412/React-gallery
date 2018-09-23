import { call, takeEvery, put } from 'redux-saga/effects';

import { actions as galleryActions } from '../gallery';
import { getImages } from '../../services/gallery';

export function* loadImages(action) {
	const { feedUrl } = action.payload;

	yield put({ type: galleryActions.loadImages });

	const response = yield call(getImages, feedUrl);
	if (response.ok) {
			const images = yield response.json()

			yield[
				put({ type: galleryActions.setImages, payload: images }),
				put({ type: galleryActions.unsetBusy })
			];
	} else {
		console.log('error: ', response.statusCode);
	}
}

export default function* watchGallery() {
	yield takeEvery(galleryActions.loadImages, loadImages);
}