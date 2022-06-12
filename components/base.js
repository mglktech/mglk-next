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
	Checkbox,
	Form,
	Dropdown,
} from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DesktopContainer, DefaultContainer } from './Navigation/Desktop';
import { User as UserComponent } from './Navigation/User';
import { MobileContainer } from './Navigation/Mobile';
import { MediaContextProvider, Media } from './media/artsyfresnel';
import { isAdmin } from '../lib/auth';

import { useSession } from 'next-auth/react';

const SpotifyNavWidget = ({ mobile }) => {
	const [widgetData, setWidgetData] = useState(null);
	const fetchWidgetData = async () => {
		const res = await fetch('/api/spotify/');
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
			<a target="_blank" rel="noreferrer" href={widgetData.songUrl}>
				<div className="flex flex-row items-center space-x-2 pr-2">
					<Icon name="spotify" size="big" />
					<div
						style={{
							background: `url('${widgetData.albumImageUrl}') center / cover no-repeat`,
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
									{widgetData.artist}
								</span>
								<span className=" font-bold tracking-wide">
									{widgetData.title}
								</span>
								<span className=" text-gray-500 font-bold text-sm">
									{widgetData.album}
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

export const PageContent = ({ children }) => {
	const [activeItem, changeActiveItem] = useState();
	return (
		<>
			<NavBar />
			{children}
		</>
	);
};
PageContent.propTypes = {
	children: PropTypes.node,
};

export const NavBar = () => {
	// This NavBar needs to know the context under which it is rendering.
	// It can be either a mobile or desktop context.
	return (
		<MediaContextProvider>
			<Media lessThan="md">
				<NavbarMobile />
			</Media>
			<Media greaterThanOrEqual="md">
				<NavbarDesktop />
			</Media>
		</MediaContextProvider>
	);
};

const MobileNav = ({ handleToggle }) => (
	<Menu inverted pointing secondary size="large">
		<Menu.Item>mglk.tech</Menu.Item>
		<Menu.Item position="right">
			<Menu.Item onClick={handleToggle}>
				<Icon name="sidebar" />
			</Menu.Item>
			<UserComponent />
		</Menu.Item>
	</Menu>
);

export const Uuid = ({ uuid }) => {
	return <b className="px-2 bg-gray-500 text-white tracking-wider">{uuid}</b>;
};

const NavbarMobile = () => {
	const [visible, setVisible] = useState(false);

	return (
		<Menu
			inverted
			fluid
			compact
			className="rounded-none"
			fixed="top"
			style={{ height: '50px' }}
		>
			<Menu.Item>
				<Header as="a" href="/" inverted>
					mglk.tech
				</Header>
			</Menu.Item>
			<Menu.Item>
				<Dropdown icon="sidebar">
					<Dropdown.Menu>
						<NavMenuItems />
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>
			{/* <NavMenuItems /> */}

			<Menu.Item position="right">
				<SpotifyNavWidget mobile />
				<UserComponent mobile />
			</Menu.Item>
		</Menu>
	);
};

const NavbarDesktop = () => {
	return (
		<Menu
			inverted
			fluid
			compact
			className="rounded-none"
			fixed="top"
			style={{ height: '50px' }}
		>
			<Menu.Item>
				<Header as="a" href="/" inverted>
					mglk.tech
				</Header>
			</Menu.Item>

			<NavMenuItems />

			<Menu.Item position="right">
				<SpotifyNavWidget />
				<UserComponent />
			</Menu.Item>
		</Menu>
	);
};

export const FrontPageHero = () => (
	<MediaContextProvider>
		<Media lessThan="md">
			<HeroComponent mobile />
		</Media>
		<Media greaterThanOrEqual="md">
			<HeroComponent />
		</Media>
	</MediaContextProvider>
);
const HeroComponent = ({ mobile = null }) => {
	return (
		<div
			style={{
				backgroundColor: `black`,
				background: `linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),url('/bin/landing.JPG') center / cover no-repeat`,
				padding: 0,
				margin: 0,
				marginTop: '-50px',
				backgroundAttachment: 'fixed',
				minHeight: '100vh',
				minWidth: '100vw',
			}}
		>
			<Container
				style={{
					padding: mobile ? '0em' : '10em',
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
						fontSize: mobile ? '2em' : '4em',
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
};

export const DefaultHead = ({ title }) => (
	<Head>
		{title ? <title>{title}</title> : <title>mglk.tech</title>}
		<meta name="description" content="By mglk" />
		<link rel="icon" href="/favicon.ico" />
	</Head>
);

export const ResponsiveContainer = ({ children, hero }) => {
	// Defunct atm
	// Send Media Context to Container to determine which to render
	// Display Media Context in Nav Bar
	return (
		<MediaContextProvider>
			<Media as={Sidebar.Pushable} at="mobile">
				<MobileContainer hero={hero}>{children}</MobileContainer>
			</Media>
			<Media greaterThan="mobile">
				<DefaultContainer>{children}</DefaultContainer>
			</Media>
		</MediaContextProvider>
	);
};

export const BasicContainer = ({ children }) => {
	return (
		<MediaContextProvider>
			<Media lessThan="md">
				<DefaultContainer mediaContext="mobile">{children}</DefaultContainer>
			</Media>
			<Media greaterThanOrEqual="md">
				<DefaultContainer mediaContext="desktop">{children}</DefaultContainer>
			</Media>
		</MediaContextProvider>
	);
};

ResponsiveContainer.propTypes = {
	children: PropTypes.node,
};

export const NavMenuItems = () => {
	const router = useRouter();
	const session = useSession();
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
				content="About"
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
				content: <span className="line-through">Download CV</span>,
			},
			{
				link: '#',
				content: <span className="line-through">Site Resources</span>,
			},
			{
				link: '#',
				content: <span className="line-through">Licenses</span>,
			},
			{
				link: '/contact',
				content: 'Contact',
			},
		],
	},
	{
		columnWidth: 3,
		headerContent: 'Services',
		listItems: [
			{
				link: 'https://www.last.fm/user/mglkdottech',
				content: 'Music',
			},
			{
				link: 'https://github.com/mglktech/mglk-next',
				content: 'Source Code',
			},
			{
				link: '#',
				content: <span className="line-through">Documentation</span>,
			},
		],
	},
	{
		columnWidth: 7,
		headerContent: 'Social',
		children: (
			<>
				<Icon
					name="facebook"
					size="big"
					link
					onClick={() => window.open('https://www.facebook.com/mglkdottech')}
				/>
				<Icon
					name="github"
					size="big"
					onClick={() => window.open('https://github.com/mglktech/')}
				/>
				<Icon
					name="discord"
					size="big"
					onClick={() => window.open('https://discord.gg/bcUZnhdQPY')}
				/>
			</>
		),
	},
];

const SocialMediaFooterIcon = ({ typeName }) => {
	switch (typeName) {
		case 'facebook':
			return <Icon name="facebook" />;
		case 'instagram':
			return <Icon name="instagram" />;
		case 'spotify':
			return <Icon name="spotify" />;
		case 'linkedin':
			return <Icon name="linkedin" />;
		case 'discord':
			return <Icon name="discord" />;
		case 'github':
			return <Icon name="github" />;
		default:
			return null;
	}
};

export const DefaultFooter = (data) => (
	<Segment inverted vertical style={{ padding: '2em 0em' }}>
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

export const InputInitiallyHidden = ({ pre, text, fluid = false }) => {
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
				fluid={fluid}
				action={{
					size: 'tiny',
					content: btnText,
					onClick: toggleHidden,
				}}
				value={text}
			/>
		</>
	);
};
