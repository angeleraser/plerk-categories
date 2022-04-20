import { CATEGORY_DEFAULT_IMAGE } from '../constants/category-default-image';

const processCategoryImageURL = (url: string): Promise<string> => {
	const image = new Image();
	image.src = url;

	return new Promise<string>((resolve) => {
		image.onload = () => {
			resolve(url);
		};
		image.onerror = () => {
			resolve(CATEGORY_DEFAULT_IMAGE);
		};
	});
};

export { processCategoryImageURL };
