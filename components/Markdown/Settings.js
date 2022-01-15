import Button from '../Button/Button';
import { useRouter } from 'next/router';
import { FaSave, FaTrash } from 'react-icons/fa';
const settings = () => {
	const router = useRouter();
	return (
		<div className="flex flex-row justify-between">
			<input placeholder="Title"></input>
			<div className="flex content-center items-center">
				<span className="bg-gray-200 p-2">Article id: 12345678</span>
			</div>
			<Button
				text=""
				onClick={() => {
					// Delete Article Modal
					//console.log('save button clicked!');
					//router.push('/articles');
				}}
				className="rounded bg-red-500 text-white text-xl p-3 m-3"
				iconRight={<FaTrash className="mx-1" />}
			/>
		</div>
	);
};

export default settings;
