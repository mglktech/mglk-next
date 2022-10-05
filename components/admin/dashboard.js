import fileSize from 'filesize';
import {
	Form,
	Checkbox,
	Card,
	Button,
	Label,
	Icon,
	Container,
	Segment,
	Image,
	Grid,
	Header,
	Menu,
	Placeholder,
	Modal,
	Input,
	Divider,
	Progress,
	TextArea,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Moment from 'react-moment';
import ms from 'ms';

const fetcher = async (...args) => {
	return fetch(...args).then(async (res) => {
		const json = await res.json();
		return json;
	});
};

const conversion = (data) => {
	const memUsed = data.totalMem - data.freeMem;
	const memUsage = Math.floor((memUsed / data.totalMem) * 100);
	return {
		memUsed,
		memUsage,
	};
};

const Dashboard = () => {
	const [systemData, setSystemData] = useState({});
	const { data, error } = useSWR('/api/data/admin', fetcher);
	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;

	return (
		<Segment compact>
			<Header icon="wrench" as="h3" dividing content="Hardware Info" />
			<div>
				<Label color="black">
					Hostname: <Label.Detail>{`${data.hostName}`}</Label.Detail>
				</Label>
				<Label color="grey">
					Platform: <Label.Detail>{`${data.platform}`}</Label.Detail>
				</Label>
				<Label color="blue">
					Uptime: <Label.Detail>{`${ms(data.uptime * 1000)}`}</Label.Detail>
				</Label>
			</div>
			<Segment raised compact>
				<Header
					icon="microchip"
					as="h4"
					content="System Information"
					dividing
				/>

				<Label>
					Model:
					<Label.Detail>{`${data?.cpus[0]?.model}`}</Label.Detail>
				</Label>
				<div className="pt-1"></div>
				<Label>
					Cores: <Label.Detail>{`${data.cpus.length}`}</Label.Detail>
				</Label>
				<div className="pt-1"></div>
				{data?.cpus?.map((e, index) => {
					return (
						<>
							<Label key={index}>
								{`#${index + 1}`}
								<Label.Detail>{`${e.speed / 1000}Ghz`}</Label.Detail>
							</Label>
						</>
					);
				})}
			</Segment>
			<Segment raised fluid>
				<Header
					as="h3"
					icon="database"
					subheader={`${fileSize(conversion(data).memUsed)} / ${fileSize(
						data.totalMem
					)} (${conversion(data).memUsage}%)`}
					content="Memory Usage"
					dividing
				/>

				<Progress
					percent={conversion(data).memUsage}
					size="big"
					color="teal"
					progress
				/>
			</Segment>
		</Segment>
	);
};

export default Dashboard;
