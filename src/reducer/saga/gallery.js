import { call, takeEvery, put } from 'redux-saga/effects';
import { sortBy } from 'lodash';

import { actions as galleryActions } from '../gallery';
import { getImages } from '../../services/gallery';

export function* loadImagesSaga(action) {
	const { feedUrl, query, sortby } = action.payload;

	yield put({ type: galleryActions.setBusy });

	const response = yield call(getImages, feedUrl);
	if (response.ok) {
		let images = yield response.json()
		
		// Filter by search query
		images = images.filter(img => img.title.includes(query));

		// Sort by sort mode
		images = sortBy(images, img => sortby === 'title' ? img.title : img.date);
		
		yield[
			put({ type: galleryActions.setImages, payload: images }),
			put({ type: galleryActions.unsetBusy })
		];
	} else {
		console.log('error: ', response.statusCode);
	}
}

export default function* watchGallerySaga() {
	yield takeEvery(galleryActions.loadImages, loadImagesSaga);
}