//import { useSession } from 'next-auth/react';
import { hash, compare } from 'bcryptjs';

export const isRole = (session, role) => {
	//const { data: session, status } = useSession({ required: true });
	return !!session?.user?.roles?.includes(role);
};
export const isAdmin = (session) => {
	console.log(`userType: `, session?.user?.userType);
	console.log(`admin: `, session?.user?.userType == 'admin');
	return session?.user?.userType === 'admin';
};

export const isAuth = (session) => {
	//const { data: session, status } = useSession({ required: true });
	return !!session?.user;
};

export async function hashPassword(password) {
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}
