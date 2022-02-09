import {
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
	Input,
	Button,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
export const DefaultHead = () => (
	<Head>
		<title>Mglk.tech</title>
		<meta name="description" content="By mglk" />
		<link rel="icon" href="/favicon.ico" />
		<link
			rel="stylesheet"
			href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
		/>
	</Head>
);

export const DefaultFooter = () => (
	<Segment inverted vertical style={{ padding: '5em 0em' }}>
		<Container>
			<Grid divided inverted stackable>
				<Grid.Row>
					<Grid.Column width={3}>
						<Header inverted as="h4" content="About" />
						<List link inverted>
							<List.Item as="a">Sitemap</List.Item>
							<List.Item as="a">Contact Us</List.Item>
							<List.Item as="a">Religious Ceremonies</List.Item>
							<List.Item as="a">Gazebo Plans</List.Item>
						</List>
					</Grid.Column>
					<Grid.Column width={3}>
						<Header inverted as="h4" content="Services" />
						<List link inverted>
							<List.Item as="a">Banana Pre-Order</List.Item>
							<List.Item as="a">DNA FAQ</List.Item>
							<List.Item as="a">How To Access</List.Item>
							<List.Item as="a">Favorite X-Men</List.Item>
						</List>
					</Grid.Column>
					<Grid.Column width={7}>
						<Header as="h4" inverted>
							Footer Header
						</Header>
						<p>
							Extra space for a call to action inside the footer that could help
							re-engage users.
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	</Segment>
);

export const HeaderIconSub = (props) => {
	const { content, icon, sub } = props;
	return (
		<>
			<div>
				<Header as="h2">
					<Icon name={icon} />
					<Header.Content>
						{content}
						<Header.Subheader>{sub}</Header.Subheader>
					</Header.Content>
				</Header>
			</div>
		</>
	);
};

export const InputInitiallyHidden = ({ pre, text }) => {
	const [inputType, toggleInputType] = useState('password');
	const [btnText, setBtnText] = useState('Show');
	const toggleHidden = () => {
		console.log('Toggle hidden clicked');
		if (inputType == 'password') {
			toggleInputType('text');
			setBtnText('Hide');
			return;
		}
		toggleInputType('password');
		setBtnText('Show');
		return;
	};
	return (
		<>
			<Input
				size="small"
				type={inputType}
				label={pre}
				action={{
					content: btnText,
					onClick: toggleHidden,
				}}
				value={text}
			/>
		</>
	);
};
