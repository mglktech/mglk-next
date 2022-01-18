import Layout from '../layouts/Default';

const Admin = () => {
	return (
		<Layout>
			<div>Admin Route</div>
		</Layout>
	);
};

export default Admin;
Admin.auth = true;
Admin.admin = true;
