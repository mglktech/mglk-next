import { DefaultLayout } from '../layouts/DefaultLayout';

const accessDenied = () => {
	return (
		<DefaultLayout>
			<div>No access</div>
		</DefaultLayout>
	);
};

export default accessDenied;
