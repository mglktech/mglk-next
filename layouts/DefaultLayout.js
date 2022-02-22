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
import { DefaultHead, DefaultFooter } from '../components/base';

export const DefaultLayout = ({ children, title, hero }) => (
	<>
		<DefaultHead title={title} />
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<div style={{ flex: '1 0 auto' }}>
				<ResponsiveContainer hero={hero ? true : false}>
					{children}
				</ResponsiveContainer>
			</div>
			<div style={{ flexShrink: '0' }}>
				<DefaultFooter />
			</div>
		</div>
	</>
);
