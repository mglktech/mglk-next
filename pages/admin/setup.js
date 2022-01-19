import Layout from '../../layouts/Default';
// import dbConnect from '../../utils/dbConnect';
// import CronJobs from '../../models/Cronjob';
// import cronConfig from '../../server/config/cron';
// import cronController from '../../server/controllers/cron';
const Setup = () => {
	return (
		<Layout>
			<div>Admin Setup Route</div>
		</Layout>
	);
};
export async function getServerSideProps(ctx) {
	const host = ctx.req.headers.host;
	return {
		props: {},
	};
}

export default Setup;
Setup.auth = true;
Setup.admin = true;
