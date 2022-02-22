import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
const ImagesGallery = () => {
	const [images, setImages] = React.useState(null);
	React.useEffect(() => {
		let shouldCancel = false;
		const call = async () => {
			const response = await axios.get('/api/data/photos');
			if (!shouldCancel && response.data && response.data.length > 0) {
				const theImages = response.data.map((url) => ({
					original: `${url}=w1024`,
					thumbnail: `${url}=w100`,
				}));
				console.log(theImages);
				setImages(theImages);
			}
		};
		call();
		return () => (shouldCancel = true);
	}, []);
	return images ? <ImageGallery items={images} /> : null;
};
export default ImagesGallery;
