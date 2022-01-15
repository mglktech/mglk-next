const nowPlaying = (req, res) => {
	res.status(200).json({
		artist: {
			mbid: 'cc0b7089-c08d-4c10-b6b0-873582c17fd6',
			'#text': 'System of a Down',
		},
		streamable: '0',
		image: [
			{
				size: 'small',
				'#text':
					'https://lastfm.freetls.fastly.net/i/u/34s/4daf77ff9a3e4edea6f0bbbb1e11a04d.png',
			},
			{
				size: 'medium',
				'#text':
					'https://lastfm.freetls.fastly.net/i/u/64s/4daf77ff9a3e4edea6f0bbbb1e11a04d.png',
			},
			{
				size: 'large',
				'#text':
					'https://lastfm.freetls.fastly.net/i/u/174s/4daf77ff9a3e4edea6f0bbbb1e11a04d.png',
			},
			{
				size: 'extralarge',
				'#text':
					'https://lastfm.freetls.fastly.net/i/u/300x300/4daf77ff9a3e4edea6f0bbbb1e11a04d.png',
			},
		],
		mbid: '12737514-fc6d-445e-9055-cc9195a6b378',
		album: {
			mbid: '1637bc33-26fd-47a8-a6a5-173b68d6f051',
			'#text': 'Mezmerize',
		},
		name: 'Soldier Side - Intro',
		'@attr': { nowplaying: 'true' },
		url: 'https://www.last.fm/music/System+of+a+Down/_/Soldier+Side+-+Intro',
	});
};

export default nowPlaying;
