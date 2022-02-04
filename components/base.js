import { Form, Header, Icon, Input, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
export const HeaderIconSub = (props) => {
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
			</div>
		</>
	);
};

export const InputInitiallyHidden = ({ pre, text }) => {
	const [inputType, toggleInputType] = useState('password');
	const [btnText, setBtnText] = useState('Show');
	const toggleHidden = () => {
		console.log('Toggle hidden clicked');
		if (inputType == 'password') {
			toggleInputType('text');
			setBtnText('Hide');
			return;
		}
		toggleInputType('password');
		setBtnText('Show');
		return;
	};
	return (
		<>
			<Input
				size="small"
				type={inputType}
				label={pre}
				action={{
					content: btnText,
					onClick: toggleHidden,
				}}
				value={text}
			/>
		</>
	);
};
