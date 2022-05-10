/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import User from '../Navigation/User';
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
	Label,
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
	<Container
		style={{
			minHeight: mobile ? '30vh' : '30vh',
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

		<Button size="large" as="a" href="/contact" inverted>
			Get in Contact
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

// export const MenuItems = ({ mobile, fixed }) => {
// 	const router = useRouter();

// 	const setActive = (path) => (router.pathname.startsWith(path) ? true : false);
// 	return mobile ? (
// 		<>
// 			<Menu.Item as="a" active>
// 				Home
// 			</Menu.Item>
// 			<Menu.Item as="a">Work</Menu.Item>
// 			<Menu.Item as="a">Company</Menu.Item>
// 			<Menu.Item as="a">Careers</Menu.Item>
// 			<Menu.Item as="a">Log in</Menu.Item>
// 			<Menu.Item as="a">Sign Up</Menu.Item>
// 		</>
// 	) : (
// 		<Menu
// 			fixed={fixed ? 'top' : null}
// 			inverted={!fixed}
// 			pointing={!fixed}
// 			secondary={!fixed}
// 		>
// 			<Menu.Item>mglk.tech</Menu.Item>
// 			<Container>
// 				<Menu.Item name="home" as="a" href="/" active={router.pathname === '/'}>
// 					Home
// 				</Menu.Item>
// 				<Menu.Item
// 					name="work"
// 					as="a"
// 					href="/articles"
// 					active={setActive('/articles')}
// 				>
// 					Work
// 				</Menu.Item>
// 				<Menu.Item name="company" as="a" active={activeItem === 'company'}>
// 					Company
// 				</Menu.Item>
// 				<Menu.Item
// 					name="careers"
// 					as="a"
// 					href="/"
// 					active={activeItem === 'careers'}
// 				>
// 					Careers
// 				</Menu.Item>
// 				<Menu.Item position="right">
// 					<User fixed={fixed} />
// 				</Menu.Item>
// 			</Container>
// 		</Menu>
// 	);
// };

const NavMenuItems = ({ router }) => {
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
				content="Gallery"
				href="/gallery"
				active={setActive('/gallery')}
			/>
			<Menu.Item
				as="a"
				content="Projects"
				href="/projects"
				active={setActive('/projects')}
			/>
			<Menu.Item
				as="a"
				content="Gaming"
				href="/gaming"
				active={setActive('/gaming')}
			/>
			<Menu.Item
				as="a"
				content="Music"
				href="/music"
				active={setActive('/music')}
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

export const DesktopNav = ({ fixed }) => {
	const router = useRouter();
	const color = 'black';
	return (
		<Menu
			fixed={fixed ? 'top' : null}
			secondary={!fixed}
			inverted={true}
			// pointing={!fixed}
		>
			<Menu.Item>
				<Header as="h3" inverted>
					mglk.tech
				</Header>
			</Menu.Item>
			<Container>
				<NavMenuItems router={router} />
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
			<NavMenuItems router={router} />
		</>
	);
};

export const MobileNav = ({ handleToggle }) => (
	<Menu inverted pointing secondary size="large">
		<Menu.Item>mglk.tech</Menu.Item>
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
		<>
			<Visibility
				once={false}
				onBottomPassed={showFixedMenu}
				onBottomPassedReverse={hideFixedMenu}
			>
				<Segment
					inverted
					textAlign="center"
					style={{ padding: 0, margin: 0 }}
					vertical
				>
					{hero ? (
						<div
							style={{
								background: `linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),url('/bin/DSC_0151.jpg') center / cover`,
								padding: 0,
								margin: 0,
							}}
						>
							<DesktopNav
								activeItem={activeItem}
								changeActiveItem={changeActiveItem}
								fixed={navFixed}
							></DesktopNav>
							<HomepageHeading />
						</div>
					) : (
						<DesktopNav
							activeItem={activeItem}
							changeActiveItem={changeActiveItem}
							fixed={navFixed}
						></DesktopNav>
					)}
				</Segment>
			</Visibility>
			{children}
		</>
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
					style={{ padding: '0px' }}
					inverted
					textAlign="center"
					vertical
				>
					{hero ? (
						<div
							style={{
								background: `linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),url('/bin/DSC_0151.jpg') center / cover`,
								padding: 0,
								margin: 0,
							}}
						>
							<Container>
								<MobileNav handleToggle={handleToggle} />
							</Container>
							<HomepageHeading mobile />
						</div>
					) : (
						<Container>
							<MobileNav handleToggle={handleToggle} />
						</Container>
					)}
				</Segment>
				{children}
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	);
};

export const ResponsiveContainer = ({ children, hero }) => {
	return (
		<MediaContextProvider>
			<Media as={Sidebar.Pushable} at="mobile">
				<MobileContainer hero={hero}>{children}</MobileContainer>
			</Media>
			<Media greaterThan="mobile">
				<DesktopContainer hero={hero}>{children}</DesktopContainer>
			</Media>
		</MediaContextProvider>
	);
};

ResponsiveContainer.propTypes = {
	children: PropTypes.node,
};
