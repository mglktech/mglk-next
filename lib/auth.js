//import { useSession } from 'next-auth/react';

export const isRole = (session, role) => {
	//const { data: session, status } = useSession({ required: true });
	return !!session?.roles?.includes(role);
};
