import { all } from 'redux-saga/effects';

import watchGallerySaga from './gallery';

export default function* rootSaga() {
	yield all([
			watchGallerySaga
	]);
}