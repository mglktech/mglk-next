// Fetch array of photos from api/data/photos
// Display array as list
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeaderIconSub } from '../base';
import {
	Form,
	Label,
	List,
	Header,
	Segment,
	Container,
	Icon,
} from 'semantic-ui-react';
import Gallery from '../../components/Gallery';
const PhotoManager = () => {
	return (
		<>
			<Segment inverted>
				<Header as="h2">
					<Icon name="settings" />
					<Header.Content>
						Account Settings
						<Header.Subheader>Manage your preferences</Header.Subheader>
					</Header.Content>
				</Header>
				<Gallery />
			</Segment>
		</>
	);
};

export default PhotoManager;
