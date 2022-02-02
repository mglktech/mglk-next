import { Input, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
const InputInitiallyHidden = ({ pre, text }) => {
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
InputInitiallyHidden.InitialProps = {
	text: '',
};

export default InputInitiallyHidden;
