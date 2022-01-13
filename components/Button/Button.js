function Button(props) {
	const defaultClasses = 'inline-flex whitespace-nowrap items-center ';
	const classes = defaultClasses.concat(props.className);
	return (
		<button className={classes}>
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
};
export default Button;
