import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../layouts/Default';
import { useSession } from 'next-auth/react';
const ClientAuth = () => {
	const { data: session } = useSession();
	const router = useRouter();
	return session ? (
		<Layout>Client Auth Route</Layout>
	) : (
		<Layout> You must be logged in to view this content.</Layout>
	);
};

export default ClientAuth;
