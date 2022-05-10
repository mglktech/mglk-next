import { User } from './User';
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
import { HomepageHeading, NavMenuItems } from '../base';

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
    ),url('/gallery/1') center / cover`,
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

export const MobileNavSidebar = () => {
	const router = useRouter();

	const setActive = (path) => (router.pathname.startsWith(path) ? true : false);
	return (
		<>
			<NavMenuItems router={router} />
		</>
	);
};
