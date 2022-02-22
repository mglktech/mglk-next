import User from './User';
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
    ),url('https://lh3.googleusercontent.com/63MywVwXos7zeS10wB529uFQ0tr1xUybNIY6BmfaujUwGqBqyjR1OV58R-jCK3F_ghcFknqInsX559cByoypBV3HqDk0Ousc6qVVlH8loO_V7CrPcl1JeKOrgM9CULMEMb5BwiMrZvM=w1024') center / cover`,
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
