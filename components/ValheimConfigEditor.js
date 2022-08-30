import {
	Segment,
	Accordion,
	Container,
	Header,
	Icon,
	Input,
	Form,
	Menu,
	Button,
	Divider,
	Modal,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
// import { readConfig } from '../lib/valheim/cfg';
const OptionsAccordian = ({ options }) => {
	const [activeIndex, setActiveIndex] = useState(-1);
	const handleClick = (e, { index }) => {
		index == activeIndex ? setActiveIndex(-1) : setActiveIndex(index);
	};
	return (
		<>
			<Accordion>
				{options?.map((opt, index) => {
					return (
						<>
							<Accordion.Title
								key={index}
								active={activeIndex === index}
								index={index}
								onClick={handleClick}
							>
								<Input fluid label={opt.name} value={opt.value} />
							</Accordion.Title>
							<Accordion.Content active={activeIndex === index}>
								<div className="pl-5 text-gray-400">
									{opt.description.map((e, index) => {
										return (
											<>
												<p className="m-1" key={index}>
													{e}
												</p>
											</>
										);
									})}
								</div>
							</Accordion.Content>
						</>
					);
				})}
			</Accordion>
		</>
	);
};

const Editor = ({ config }) => {
	// Map each setting
	const [activeIndex, setActiveIndex] = useState();
	const handleClick = (e, { index }) => {
		index == activeIndex ? setActiveIndex(-1) : setActiveIndex(index);
	};
	return (
		<>
			<Accordion>
				{config?.settings?.map((e, index) => {
					return (
						<>
							<Accordion.Title
								key={index}
								active={activeIndex === index}
								index={index}
								onClick={handleClick}
							>
								<Icon name="dropdown"></Icon>
								{e?.category}
							</Accordion.Title>
							<Accordion.Content active={activeIndex === index}>
								<OptionsAccordian options={e.options} />
							</Accordion.Content>
						</>
					);
				})}
			</Accordion>
		</>
	);
};

const Upload = () => {
	const [file, setFile] = useState();
	const [config, setConfig] = useState();
	const [exists, setExists] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [hasUploaded, setHasUploaded] = useState(false);
	const convert = async (file) => {
		const resp = await fetch(`/api/data/cfg?f=readOnly&name=${file.name}`, {
			method: 'POST',
			body: file,
		}).then((res) => res.json());

		const { data, exists, err } = resp;
		if (err) {
			console.log(err);
			return;
		}
		if (data) {
			setExists(exists);
			setConfig(data);
		}
	};

	const handleChange = async (e) => {
		if (e.target.files && e.target.files[0]) {
			const f = e.target.files[0];
			convert(f);
			setFile(f);
			setHasUploaded(false);
		}
	};

	useEffect(() => {
		const upload = async () => {
			const resp = await fetch(`/api/data/cfg?name=${file.name}`, {
				method: 'POST',
				body: file,
			}).then((res) => res.json());
		};
		if (isUploading) {
			// perform action
			upload();
			setHasUploaded(true);
			setIsUploading(false);
			location.reload();
		}
	}, [isUploading, file]);
	return (
		<>
			<Segment>
				<Form>
					<Header as="h5">Want to convert a file?</Header>
					<Form.Input
						inline
						multiple
						name="file"
						type="file"
						accept=".cfg"
						onChange={handleChange}
					/>

					{config ? (
						<>
							<Segment basic>
								<Header as="h6" content="File Preview" />
								<Library plugins={[config]} />
							</Segment>
						</>
					) : (
						<></>
					)}
					<Form.Button
						disabled={config ? false : true}
						basic={exists}
						type="submit"
						content="Upload"
						color="green"
						onClick={(e) => {
							e.preventDefault();
							setIsUploading(true);
						}}
					/>
				</Form>
			</Segment>
		</>
	);
};

const ConfigSettingsView = ({ _id, config }) => {
	const [activeConfig, setActiveConfig] = useState({});
	const [activeIndex, setActiveIndex] = useState(-1);
	const handleClick = (e, { index }) => {
		index == activeIndex ? setActiveIndex(-1) : setActiveIndex(index);
	};
	useEffect(() => {
		const fetchConfig = async () => {
			if (config) {
				setActiveConfig(config);
				return;
			}
			const response = await fetch(`/api/data/cfg?_id=${_id}`, {}).then((e) =>
				e.json()
			);
			if (response) {
				//console.log(response);
				setActiveConfig(response);
				return;
			}
		};
		fetchConfig();
	}, [_id, config]);
	if (!_id && !config) return <>no id or config passed</>;
	return (
		<>
			<Accordion>
				{activeConfig?.settings?.map((e, index) => {
					return (
						<>
							<div key={index}>
								<Accordion.Title
									active={activeIndex === index}
									index={index}
									onClick={handleClick}
								>
									<Icon name="dropdown"></Icon>
									{e?.category}
								</Accordion.Title>
								<Accordion.Content active={activeIndex === index}>
									<OptionsAccordian options={e.options} />
								</Accordion.Content>
							</div>
						</>
					);
				})}
			</Accordion>
		</>
	);
};

const DeleteModal = ({ plugin, trigger }) => {
	const [open, setOpen] = useState(false);
	const [Delete, setDelete] = useState(false);
	const doDelete = async (_id) => {
		setOpen(false);
		const resp = await fetch(`/api/data/cfg?_id=${_id}`, {
			method: 'DELETE',
		}).then((res) => res.json());
		setDelete(false);
		location.reload();
	};

	return (
		<>
			<Modal
				basic
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				size="small"
				trigger={trigger}
			>
				<Header icon>
					<Icon name="archive" />
					Deleting {plugin.title}
				</Header>
				<Modal.Content>
					<p>
						Are you sure you want to delete this config from your library? This
						action cannot be undone.
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Button basic color="red" inverted onClick={() => setOpen(false)}>
						<Icon name="remove" /> No
					</Button>
					<Button color="green" inverted onClick={() => doDelete(plugin._id)}>
						<Icon name="checkmark" /> Yes
					</Button>
				</Modal.Actions>
			</Modal>
		</>
	);
};

const Library = ({ plugins }) => {
	const [activeIndex, setActiveIndex] = useState();
	const handleClick = async (e, { index }) => {
		index == activeIndex ? setActiveIndex(-1) : setActiveIndex(index);
	};
	return (
		<>
			{plugins ? (
				<>
					<Accordion fluid>
						{plugins.map((e, index) => {
							return (
								<>
									<Segment color={e.nexusCompatible ? 'teal' : 'orange'}>
										<DeleteModal
											plugin={e}
											trigger={
												<Button
													color="red"
													basic
													floated="right"
													icon="trash"
												/>
											}
										/>

										<Accordion.Title
											key={index}
											active={activeIndex === index}
											index={index}
											onClick={handleClick}
										>
											<Header as="h4">
												<Icon name="dropdown"></Icon>
												{e.title}
												<Header.Subheader>{e.guid}</Header.Subheader>
											</Header>
										</Accordion.Title>
										<Accordion.Content active={activeIndex === index}>
											{/* <Editor config={activeConfig} /> */}
											<Divider fitted />
											<ConfigSettingsView
												_id={e._id}
												config={e._id ? null : e}
											/>
										</Accordion.Content>
									</Segment>
								</>
							);
						})}
					</Accordion>
				</>
			) : (
				<>Loading...</>
			)}
		</>
	);
};

const IndexView = () => {
	const [cfgIndex, setCfgIndex] = useState();
	const fetchIndex = async () => {
		const response = await fetch('/api/data/cfg').then((e) => e.json());
		//console.log(response);
		if (response.err) {
			console.log(err);
			return;
		}
		if (response) {
			setCfgIndex(response);
			return;
		}
	};

	useEffect(() => {
		fetchIndex();
	}, []);
	return (
		<>
			<Segment>
				<Header as="h4" content="Your Library" />
				<Library plugins={cfgIndex} />
			</Segment>
		</>
	);
};

const ValheimConfigEditor = () => {
	return (
		<>
			<Container>
				<Upload />
				<IndexView />
			</Container>
		</>
	);
};

export default ValheimConfigEditor;
