import { Form, Label, List, Header } from 'semantic-ui-react';
import { HeaderIconSub } from '../base';
import { useState, useEffect } from 'react';

const Package = ({ packageName }) => {
	const [PackageData, setPackageData] = useState();
	const fetchPackageData = async () => {
		try {
			const res = await fetch(
				`https://api.npms.io/v2/package/${packageName}`
			).then((data) => data.json());
			setPackageData(res);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		fetchPackageData();
	}, []);
	return (
		<>
			<Header>
				{PackageData?.collected?.metadata?.name}
				<Header.Subheader>
					{PackageData?.collected?.metadata?.description}
				</Header.Subheader>
			</Header>
		</>
	);
};

const NodeModules = () => {
	const [packages, setPackages] = useState();
	const fetchPackages = async () => {
		try {
			const res = await fetch('/api/data/packages').then((res) => res.json());
			console.log(res.data);
			setPackages(res.data);
		} catch {
			console.log('/api/data/packages error');
		}
	};
	const ref = (name) => {
		return `https://www.npmjs.com/package/${name}`;
	};

	useEffect(() => {
		fetchPackages();
	}, []);

	return (
		<>
			<Form className="bg-gray-100 p-4">
				<HeaderIconSub
					content="NodeModules"
					icon="file"
					sub={<Label>This is a Label.</Label>}
				/>
				{packages ? (
					<>
						<List celled>
							{packages.map((pack) => (
								<>
									<List.Item>
										<Label as="a" target="_blank" href={ref(pack)}>
											{pack}
										</Label>
										<Package packageName={pack} />
									</List.Item>
								</>
							))}
						</List>
					</>
				) : (
					<>no packages</>
				)}
			</Form>
		</>
	);
};

export default NodeModules;
