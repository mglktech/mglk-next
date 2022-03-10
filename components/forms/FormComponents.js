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
	Form,
} from 'semantic-ui-react';

export const FormHeader = (props) => {
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
				<Divider />
			</div>
		</>
	);
};
