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

export const FormHeader = ({ content, icon, sub, divider = false }) => {
	return (
		<>
			<Header as="h2">
				<Icon name={icon} />
				<Header.Content>
					{content}
					<Header.Subheader>{sub}</Header.Subheader>
				</Header.Content>
			</Header>
			{divider ? <Divider /> : null}
		</>
	);
};
