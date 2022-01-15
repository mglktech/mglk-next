import { useRouter } from 'next/router';
function Button(props) {
	const defaultClasses =
		'inline-flex whitespace-nowrap justify-evenly items-center ';
	const router = useRouter();
	const classes = defaultClasses.concat(props.className);
	return (
		<button className={classes} onClick={props.onClick}>
			{props.iconLeft || ''}
			{props.text}
			{props.iconRight || ''}
		</button>
	);
}
Button.defaultProps = {
	className: 'm-1 p-1 bg-indigo-500 rounded',
	icon: '',
	iconLeft: false,
	iconRight: false,
	color: '',
	outline: false,
	text: 'button',
	onClick: {},
};
export default Button;
