import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { FaUserAlt, FaClipboardList } from 'react-icons/fa';
const Nav = (props) => {
	return (
		<div className="flex justify-between items-center bg-gray-200 w-full sticky top-0">
			<div className="inline-block mx-5">
				<span className="text-3xl font-bold text-indigo-700">mglk</span>
				<span className="text-xl italic">.tech</span>
			</div>
			<span className="text-xl italic text-gray-400 truncate overflow-ellipsis">
				Now with Middle text!
			</span>
			<div className="inline-flex">
				<Button
					text="Editor"
					className="rounded bg-indigo-500 text-white p-2 m-2"
					iconLeft={<FaClipboardList className="mx-1" />}
				/>
				<Button
					text="Login"
					className="rounded bg-indigo-500 text-white p-2 m-2"
					iconLeft={<FaUserAlt className="mx-1" />}
				/>
				<Button
					text="Sign Up"
					className="rounded border border-indigo-500 p-2 m-2 text-indigo-700"
					iconRight={<FaClipboardList className="mx-1" />}
				/>
			</div>
		</div>
	);
};

export default Nav;
