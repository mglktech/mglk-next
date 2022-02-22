import React from 'react';
import { Button, Card, Container, Image, Icon } from 'semantic-ui-react';
const CardPreview = ({ project }) => {
	const headerImageStyling = (url) => {
		return {
			width: '100%',
			height: '45%',
			background: `url('${project.headerImage_url}') center / cover`,
		};
	};
	return (
		<Card
			as="a"
			href={`/projects/${project._id}`}
			style={{
				minWidth: '300px',
				minHeight: '360px',
			}}
		>
			<div style={headerImageStyling(project.headerImage_url)}></div>
			<Card.Content>
				<Card.Header>{project.title}</Card.Header>
				<p>{project.description}</p>
			</Card.Content>
		</Card>
	);
};

// CardPreview.defaultProps = {
// 	project: {
// 		title: 'Some Title',
// 		description: 'Some Description',
// 		url: '/bin/fire_dancer.jpg',
// 	},
// };

export default CardPreview;
