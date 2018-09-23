export function getImages(url) {

	// @cohen: Is it supposed to retrieve image json data via api call
	// Or just use local json file?
	
	return fetch(url,
		{
			method: 'GET'
		}
	);
}