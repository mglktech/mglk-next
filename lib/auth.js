//import { useSession } from 'next-auth/react';
import { hash, compare } from 'bcryptjs';

export const isRole = (session, role) => {
	//const { data: session, status } = useSession({ required: true });
	return !!session?.roles?.includes(role);
};

export async function hashPassword(password) {
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
	const isValid = await compare(password, hashedPassword);
	return isValid;
}