import { User } from './User';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
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
import { HomepageHeading, NavMenuItems } from '../base';

export const DefaultContainer = ({ children }) => {
	const [activeItem, changeActiveItem] = useState();
	return (
		<>
			<BasicDesktopNav
				activeItem={activeItem}
				changeActiveItem={changeActiveItem}
			/>
			{/* <Header as="h1" content="Some Content" /> */}
			{children}
		</>
	);
};
DefaultContainer.propTypes = {
	children: PropTypes.node,
};

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
					<DesktopNav
						activeItem={activeItem}
						changeActiveItem={changeActiveItem}
						fixed={navFixed}
					></DesktopNav>
				</Segment>
			</Visibility>
			{children}
		</>
	);
};
DesktopContainer.propTypes = {
	children: PropTypes.node,
};

export const BasicDesktopNav = ({}) => {
	const router = useRouter();
	const color = 'black';
	return (
		<Segment>
			<Menu inverted={true} fixed={'top'}>
				<Menu.Item>
					<Header as="h3" inverted>
						mglk.tech
					</Header>
				</Menu.Item>
				<Container>
					<NavMenuItems router={router} />
					<Menu.Item position="right">
						<User />
					</Menu.Item>
				</Container>
			</Menu>
		</Segment>
	);
};

export const DesktopNav = ({ fixed }) => {
	const router = useRouter();
	const color = 'black';
	return (
		<Menu
			fixed={fixed ? 'top' : null}
			secondary={false}
			inverted={true}
			//style={{ height: '10%' }}
			// pointing={!fixed}
		>
			<Menu.Item>
				<Header as="h3" inverted>
					Michael Kendall
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
