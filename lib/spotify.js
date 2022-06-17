import querystring from 'querystring';

const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const refreshRate = 3; // Number of seconds between each request to the endpoint for new data

/*
switch-based response type, based on a timer called RefreshRate,
Store a variable in the main thread for the Spotify class
The Spotify class contains two objects: lastResponse, and a timestamp.
- lastResponse stores the Spotify API's last query response,
- timestamp stores the date and time that the lastResponse was updated.

CASE 1: Timestamp is less than RefreshRate Seconds in the past ->
  return lastResponse;
CASE 2: Timestamp is More than or Equal To RefreshRate Seconds in the past -> 
  update the variable,
  return the new variable.
*/

let cached = global.spotify;
if (!cached) {
	cached = global.spotify = {
		conn: null,
		promise: null,
		timestamp: Date.now(),
	};
}
export async function spotifyConnect() {
	//console.log('spotifyConnect called');
	const expired =
		Date.now() >= cached.timestamp + cached?.conn?.expires_in * 1000;
	if (expired) {
		cached.promise = null;
	}

	if (!cached.promise) {
		cached.promise = await getAccessToken();
		cached.timestamp = Date.now();
		//console.log(`Spotify: Token Retrieved - `, cached.promise);
	}

	//console.log(`cached: `, cached, 'expired: ', expired);
	if (cached.conn) {
		return cached.conn;
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

const getAccessToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token,
		}),
	});

	return response.json();
};

export async function getNowPlaying() {
	const { access_token } = await spotifyConnect();
	const response = await fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
	const { status, statusText } = response;
	if (response.status === 204) {
		return { isPlaying: false, error: true, status, statusText };
	}
	if (response.status >= 400) {
		console.error(
			`Spotify API Error ${response.status}: ${response.statusText}`
		);
		return { isPlaying: false, error: true, status, statusText };
	}

	const song = await response.json();
	//console.log(song);
	const isPlaying = song.is_playing;
	const title = song?.item?.name;
	const artist = song?.item?.artists.map((_artist) => _artist.name).join(', ');
	const album = song?.item?.album?.name;
	const albumImageUrl = song?.item?.album?.images[0]?.url;
	const songUrl = song?.item?.external_urls?.spotify;

	return {
		album,
		albumImageUrl,
		artist,
		isPlaying,
		songUrl,
		title,
	};
}
let apiData = { response: null, timestamp: null };
export const nowPlaying = async () => {
	const timestamp = Date.now();
	const expired = timestamp >= apiData.timestamp + refreshRate * 1000;
	//console.log(`apiData: `, apiData, `expired: `, expired);
	if (expired) {
		const response = await getNowPlaying();
		apiData = { response, timestamp };
		return response;
	}
	const { response } = apiData;
	return response;
};
