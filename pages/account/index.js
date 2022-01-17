const Page = () => {
	return <></>;
};
export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);
	if (!session) {
		return {
			redirect: {
				destination: '/accessDenied',
				permanent: false,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
}
export default Page;
