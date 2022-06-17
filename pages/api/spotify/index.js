// SOURCES
// https://dev.to/theodorusclarence/how-to-show-now-playing-in-spotify-with-next-js-15h5
// https://github.com/theodorusclarence/now-playing-spotify/blob/main/pages/api/spotify.js
// With special thanks to Theodorus Clarence for the inspiration and code!

import { getNowPlaying, nowPlaying } from '../../../lib/spotify';

const Page = async (req, res) => {
	const response = await nowPlaying();

	res.status(200).json(response);
};
export default Page;
