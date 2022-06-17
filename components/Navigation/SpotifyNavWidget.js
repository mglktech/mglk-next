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
} from 'semantic-ui-react';

const SpotifyNavWidget = ({ mobile }) => {
	const [widgetData, setWidgetData] = useState(null);
	const fetchWidgetData = async () => {
		const res = await fetch('/api/spotify');
		const data = await res.json();
		//console.log(data);
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

const SpotifyNavAlert = () => {
	<div className="flex flex-row items-center space-x-2 pr-2">
		<div
			style={{
				background: `url('${'123'}') center / cover no-repeat`,
				height: '30px',
				aspectRatio: '1/1',
			}}
		/>
		<span className="font-bold tracking-wide">{'123'}</span>
	</div>;
};

const getData = async () => {
	const res = await fetch('/api/spotify/');
	return await res.json();
};

export { SpotifyNavWidget, SpotifyNavAlert };
