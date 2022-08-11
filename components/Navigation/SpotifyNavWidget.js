import { useState, useEffect } from 'react';
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Segment,
	Sidebar,
	Visibility,
	Label,
	Input,
	Checkbox,
	Form,
	Dropdown,
	Message,
} from 'semantic-ui-react';
import Marquee from 'react-fast-marquee';

const getData = async () => {
	const res = await fetch('/api/spotify/');
	return await res.json();
};

const SpotifyNavWidget = ({ mobile }) => {
	const [widgetData, setWidgetData] = useState(null);
	const fetchWidgetData = async () => {
		const data = await getData();
		setWidgetData(data);
	};
	useEffect(() => {
		fetchWidgetData();
		const interval = setInterval(() => {
			fetchWidgetData();
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return widgetData?.isPlaying ? (
		<>
			<a target="_blank" rel="noreferrer" href={widgetData?.songUrl}>
				<div className="flex flex-row items-center space-x-2 pr-2">
					<Icon name="spotify" size="big" />
					<div
						style={{
							background: `url('${widgetData?.albumImageUrl}') center / cover no-repeat`,
							height: '50px',
							aspectRatio: '1/1',
						}}
					/>
					{mobile ? (
						<></>
					) : (
						<>
							<div className="flex flex-col">
								<span className="text-gray-400 tracking-wide text-sm">
									{widgetData?.artist}
								</span>
								<span className=" font-bold tracking-wide">
									{widgetData?.title}
								</span>
								<span className=" text-gray-500 font-bold text-sm">
									{widgetData?.album}
								</span>
							</div>
						</>
					)}
				</div>
			</a>
		</>
	) : (
		<></>
	);
};

const SpotifyNavAlert = ({ mode }) => {
	const [widgetData, setWidgetData] = useState(null);
	const fetchWidgetData = async () => {
		const data = await getData();
		setWidgetData(data);
	};
	useEffect(() => {
		fetchWidgetData();
		const interval = setInterval(() => {
			fetchWidgetData();
		}, 5000);

		return () => clearInterval(interval);
	}, []);
	switch (widgetData?.isPlaying) {
		case true:
			return (
				<a target="_blank" rel="noreferrer" href={widgetData?.songUrl}>
					<div
						className="flex flex-row items-center align-middle text-white space-x-2 p-1 "
						style={mode ? {} : { backgroundColor: 'green' }}
					>
						<Marquee
							className="flex flex-row items-center align-middle tracking-wide flex-shrink-0"
							gradient={false}
						>
							<Icon fitted name="spotify" size="big" className="px-2" />
							{/* This container here should scroll it's contents from left to right */}
							{`Spotify - Michael is Listening to `}
							<div
								style={{
									marginLeft: `0.5rem`,
									marginRight: `0.5rem`,
									background: `url('${widgetData?.albumImageUrl}') center / cover no-repeat`,
									height: '30px',
									aspectRatio: '1/1',
								}}
							/>
							{` ` +
								widgetData?.title +
								` - ` +
								widgetData?.artist +
								` - (Album: ` +
								widgetData?.album +
								`)`}
						</Marquee>
					</div>
				</a>
			);
		case false:
			return <></>;
		default:
			return <></>;
	}
};

export { SpotifyNavWidget, SpotifyNavAlert };
