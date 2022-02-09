/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import User from '../Nav/User';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { useState } from 'react';
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
} from 'semantic-ui-react';
import { useRouter } from 'next/router';

const { MediaContextProvider, Media } = createMedia({
	breakpoints: {
		mobile: 0,
		tablet: 768,
		computer: 1024,
	},
});

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
export const HomepageHeading = ({ mobile }) => (
	<Container text>
		<Header
			as="h1"
			content="Building Web Apps"
			inverted
			style={{
				fontSize: mobile ? '2em' : '4em',
				fontWeight: 'normal',
				marginBottom: 0,
				marginTop: mobile ? '1.5em' : '3em',
			}}
		/>
		<Header
			as="h2"
			content="One page at a time."
			inverted
			style={{
				fontSize: mobile ? '1.5em' : '1.7em',
				fontWeight: 'normal',
				marginTop: mobile ? '0.5em' : '1.5em',
			}}
		/>
		<Button primary size="huge">
			Get Started
			<Icon name="right arrow" />
		</Button>
	</Container>
);

HomepageHeading.propTypes = {
	mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

export const MenuItems = ({ mobile, fixed }) => {
	const router = useRouter();

	const setActive = (path) => (router.pathname.startsWith(path) ? true : false);
	return mobile ? (
		<>
			<Menu.Item as="a" active>
				Home
			</Menu.Item>
			<Menu.Item as="a">Work</Menu.Item>
			<Menu.Item as="a">Company</Menu.Item>
			<Menu.Item as="a">Careers</Menu.Item>
			<Menu.Item as="a">Log in</Menu.Item>
			<Menu.Item as="a">Sign Up</Menu.Item>
		</>
	) : (
		<Menu
			fixed={fixed ? 'top' : null}
			inverted={!fixed}
			pointing={!fixed}
			secondary={!fixed}
		>
			<Menu.Item>Michael Kendall</Menu.Item>
			<Container>
				<Menu.Item name="home" as="a" href="/" active={router.pathname === '/'}>
					Home
				</Menu.Item>
				<Menu.Item
					name="work"
					as="a"
					href="/articles"
					active={setActive('/articles')}
				>
					Work
				</Menu.Item>
				<Menu.Item name="company" as="a" active={activeItem === 'company'}>
					Company
				</Menu.Item>
				<Menu.Item
					name="careers"
					as="a"
					href="/"
					active={activeItem === 'careers'}
				>
					Careers
				</Menu.Item>
				<Menu.Item position="right">
					<User fixed={fixed} />
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export const DesktopNav = ({ fixed }) => {
	const router = useRouter();

	const setActive = (path) => (router.pathname.startsWith(path) ? true : false);
	return (
		<Menu
			fixed={fixed ? 'top' : null}
			inverted={!fixed}
			pointing={!fixed}
			secondary={!fixed}
		>
			<Menu.Item>Michael Kendall</Menu.Item>
			<Container>
				<Menu.Item name="home" as="a" href="/" active={router.pathname === '/'}>
					Home
				</Menu.Item>
				<Menu.Item as="a" href="/articles" active={setActive('/articles')}>
					Articles
				</Menu.Item>
				<Menu.Item name="company" as="a">
					Company
				</Menu.Item>
				<Menu.Item name="careers" as="a" href="/">
					Careers
				</Menu.Item>
				<Menu.Item position="right">
					<User fixed={fixed} />
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export const MobileNavSidebar = () => {
	const router = useRouter();

	const setActive = (path) => (router.pathname.startsWith(path) ? true : false);
	return (
		<>
			<Menu.Item as="a" href="/" active={router.pathname === '/'}>
				Home
			</Menu.Item>
			<Menu.Item as="a" href="/articles" active={setActive('/articles')}>
				Articles
			</Menu.Item>
			<Menu.Item as="a">Company</Menu.Item>
			<Menu.Item as="a">Careers</Menu.Item>
			<Menu.Item as="a">Log in</Menu.Item>
			<Menu.Item as="a">Sign Up</Menu.Item>
		</>
	);
};

export const MobileNav = ({ handleToggle }) => (
	<Menu inverted pointing secondary size="large">
		<Menu.Item>Michael Kendall</Menu.Item>
		<Menu.Item position="right">
			<Menu.Item onClick={handleToggle}>
				<Icon name="sidebar" />
			</Menu.Item>
			<User mobile={true} />
		</Menu.Item>
	</Menu>
);

export const DesktopContainer = ({ children, hero }) => {
	const [navFixed, setNavFixed] = useState();
	const hideFixedMenu = () => setNavFixed(false);
	const showFixedMenu = () => setNavFixed(true);
	const [activeItem, changeActiveItem] = useState();
	return (
		<Media greaterThan="mobile">
			<Visibility
				once={false}
				onBottomPassed={showFixedMenu}
				onBottomPassedReverse={hideFixedMenu}
			>
				<Segment
					inverted
					textAlign="center"
					style={
						hero
							? { minHeight: 700, padding: '1em 0em' }
							: { padding: '1em 0em' }
					}
					vertical
				>
					<DesktopNav
						activeItem={activeItem}
						changeActiveItem={changeActiveItem}
						fixed={navFixed}
					></DesktopNav>
					{hero ? <HomepageHeading /> : <></>}
					{/* <HomepageHeading /> */}
				</Segment>
			</Visibility>

			{children}
		</Media>
	);
};
DesktopContainer.propTypes = {
	children: PropTypes.node,
};

export const MobileContainer = ({ children, hero }) => {
	const [sidebarOpened, setSidebarOpened] = useState();
	const handleSidebarHide = () => setSidebarOpened(false);
	const handleToggle = () => setSidebarOpened(true);
	return (
		<Media as={Sidebar.Pushable} at="mobile">
			<Sidebar.Pushable>
				<Sidebar
					as={Menu}
					animation="overlay"
					inverted
					onHide={handleSidebarHide}
					vertical
					visible={sidebarOpened}
				>
					<MobileNavSidebar />
				</Sidebar>

				<Sidebar.Pusher dimmed={sidebarOpened}>
					<Segment
						inverted
						textAlign="center"
						style={
							hero
								? { minHeight: 350, padding: '1em 0em' }
								: { padding: '1em 0em' }
						}
						vertical
					>
						<Container>
							<MobileNav handleToggle={handleToggle} />
						</Container>
						{hero ? <HomepageHeading mobile /> : <></>}
					</Segment>

					{children}
				</Sidebar.Pusher>
			</Sidebar.Pushable>
		</Media>
	);
};

export const ResponsiveContainer = ({ children, hero }) => {
	/* Heads up!
	 * For large applications it may not be best option to put all page into these containers at
	 * they will be rendered twice for SSR.
	 */
	return (
		<MediaContextProvider>
			<DesktopContainer hero={hero}>{children}</DesktopContainer>
			<MobileContainer hero={hero}>{children}</MobileContainer>
		</MediaContextProvider>
	);
};

ResponsiveContainer.propTypes = {
	children: PropTypes.node,
};

export const ResponsiveContainerHero = ({ children }) => (
	/* Heads up!
	 * For large applications it may not be best option to put all page into these containers at
	 * they will be rendered twice for SSR.
	 */
	<MediaContextProvider>
		<DesktopContainer hero={true}>{children}</DesktopContainer>
		{/* <MobileContainerHero>{children}</MobileContainerHero> */}
		<MobileContainer hero={true}>{children}</MobileContainer>
	</MediaContextProvider>
);

ResponsiveContainerHero.propTypes = {
	children: PropTypes.node,
};
