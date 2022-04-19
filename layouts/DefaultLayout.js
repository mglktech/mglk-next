/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import { ResponsiveContainer } from '../components/base';
import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
	Section,
} from 'semantic-ui-react';
import { DefaultHead, DefaultFooter, FooterData } from '../components/base';
import {
	DefaultContainer,
	BasicDesktopNav,
} from '../components/Navigation/Desktop';

export const StickyNavLayout = ({ children, title, hero }) => (
	<>
		<DefaultHead title={title} />
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<div style={{ flex: '1 0 auto' }}>
				<ResponsiveContainer hero={hero ? true : false}>
					{children}
				</ResponsiveContainer>
			</div>
			<div style={{ flexShrink: '0' }}>
				<DefaultFooter data={FooterData} />
			</div>
		</div>
	</>
);

export const DefaultLayout = ({ children, title, hero }) => (
	<>
		<DefaultHead title={title} />
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<BasicDesktopNav />

			<div style={{ flex: '1 0 auto' }}>
				<div style={{ height: '50px' }}></div>
				{children}
			</div>
			<div style={{ flexShrink: '0' }}>
				<DefaultFooter data={FooterData} />
			</div>
		</div>
	</>
);
