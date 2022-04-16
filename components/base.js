import { useState, useEffect } from 'react';
import Head from 'next/head';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
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
	Form,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { DesktopContainer, DefaultContainer } from './Navigation/Desktop';
import { MobileContainer } from './Navigation/Mobile';

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
});

export const FrontPageHero = () => (
	<div
		style={{
			background: `linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),url('/bin/landing.JPG') center / cover`,
			padding: 0,
			margin: 0,
			backgroundAttachment: 'fixed',
			minHeight: '100vh',
			minWidth: '100vw',
		}}
	>
		<Container
			style={{
				padding: '10em',
				textAlign: 'center',
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<Header
				inverted
				as="h1"
				content={`"I Like to Dance with Fire...`}
				style={{
					fontSize: '4em',
					fontWeight: 'normal',
					textShadow: '0 0 2px black',
					marginBottom: 0,
				}}
			/>
			<Header
				as="h2"
				content={`... and Build things for the Internet."`}
				inverted
				style={{
					fontSize: '1.7em',
					fontWeight: 'normal',
					marginTop: '1.5em',
				}}
			/>

			<Button size="large" as="a" href="/about" inverted>
				Learn More
			</Button>
		</Container>
	</div>
);

export const DefaultHead = ({ title }) => (
	<Head>
		{title ? <title>{title}</title> : <title>mglk.tech</title>}
		<meta name="description" content="By mglk" />
		<link rel="icon" href="/favicon.ico" />
	</Head>
);

export const ResponsiveContainer = ({ children, hero }) => {
	return (
		<MediaContextProvider>
			<Media as={Sidebar.Pushable} at="mobile">
				<MobileContainer hero={hero}>{children}</MobileContainer>
			</Media>
			<Media greaterThan="mobile">
				{/* <DesktopContainer hero={hero}>{children}</DesktopContainer> */}
				<DefaultContainer>{children}</DefaultContainer>
			</Media>
		</MediaContextProvider>
	);
};

ResponsiveContainer.propTypes = {
	children: PropTypes.node,
};

export const NavMenuItems = ({ router }) => {
	const setActive = (path) => (router.pathname.startsWith(path) ? true : false);
	return (
		<>
			<Menu.Item
				name="home"
				content="Home"
				as="a"
				href="/"
				active={router.pathname === '/'}
			>
				{/* <Label size="big" color="black" content="Home" /> */}
			</Menu.Item>
			<Menu.Item
				as="a"
				content="About Us"
				href="/about"
				active={setActive('/about')}
			/>

			<Menu.Item
				as="a"
				content="Contact"
				href="/contact"
				active={setActive('/contact')}
			/>
		</>
	);
};

export const HomepageHeading = ({ mobile }) => (
	<Container
		style={{
			minHeight: mobile ? '70vh' : '60vh',
		}}
	>
		<Header
			inverted
			as="h1"
			content={`"I Like to Dance with Fire...`}
			style={{
				fontSize: mobile ? '2em' : '4em',
				fontWeight: 'normal',
				textShadow: '0 0 2px black',
				marginBottom: 0,
				marginTop: mobile ? '3em' : '4em',
			}}
		/>
		<Header
			as="h2"
			content={`... and Build things for the Internet."`}
			inverted
			style={{
				fontSize: mobile ? '1.5em' : '1.7em',
				fontWeight: 'normal',
				marginTop: mobile ? '0.5em' : '1.5em',
			}}
		/>

		<Button size="large" as="a" href="/register" inverted>
			Start Your Journey
		</Button>
	</Container>
);

HomepageHeading.propTypes = {
	mobile: PropTypes.bool,
};

export const FooterData = [
	{
		columnWidth: 3,
		headerContent: 'About',
		listItems: [
			{
				link: '#',
				content: 'CV',
			},
			{
				link: '#',
				content: 'Site Resources',
			},
			{
				link: '#',
				content: 'Licences',
			},
			{
				link: '#',
				content: 'Contact',
			},
		],
	},
	{
		columnWidth: 3,
		headerContent: 'Services',
		listItems: [
			{
				link: '#',
				content: 'Music',
			},
			{
				link: '#',
				content: 'Source Code',
			},
			{
				link: '#',
				content: 'Documentation',
			},

			{
				link: '#',
				content: 'Gaming Services',
			},
		],
	},
	{
		columnWidth: 7,
		headerContent: 'Social',
		children: (
			<>
				<Label>Facebook</Label>
				<Label>Instagram</Label>
				<Label>Spotify</Label>
				<Label>LinkedIn</Label>
				<Label>Discord</Label>
				<Label>GitHub</Label>
			</>
		),
	},
];

export const SocialMediaFooterIcon = () => <></>;

export const DefaultFooter = (data) => (
	<Segment inverted vertical style={{ padding: '5em 0em' }}>
		<Container>
			<Grid divided inverted stackable>
				<Grid.Row>
					{/* Map each column giving it's width
							Include headerContent and map listItems */}
					{FooterData.map((c, index) => (
						<Grid.Column key={index} width={c.columnWidth}>
							<Header inverted as="h4" content={c.headerContent} />
							<List link inverted>
								{c.listItems?.map(({ link, content }, index) => (
									<List.Item key={index} as="a" href={link} content={content} />
								))}
							</List>
							{c.children ? c.children : <></>}
						</Grid.Column>
					))}
				</Grid.Row>
			</Grid>
		</Container>
	</Segment>
);

export const _DefaultFooter = () => (
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

export const ComingSoon = () => {
	return (
		<Segment placeholder>
			<Header icon>
				<Icon name="dolly" />
				Coming Soon!
				<Header.Subheader>
					This page is in the pipeline, Just some last little fiddly bits before
					we deliver. Check back soon!
				</Header.Subheader>
			</Header>

			<Button as="a" href="/" primary>
				Go Home
			</Button>
		</Segment>
	);
};

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
