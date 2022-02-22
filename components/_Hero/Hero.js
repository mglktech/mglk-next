import React from 'react';
import { Image, Header } from 'semantic-ui-react';

const Hero = ({ title, sub, btnText }) => {
	return (
		<div>
			<div
				className="py-20"
				style={{
					background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
				}}
			>
				<div className="container mx-auto px-6">
					<h2 className="text-4xl font-bold mb-2 text-white">{title}</h2>
					<h3 className="text-2xl mb-8 text-gray-200">{sub}</h3>
					{/* <Button
						text={btnText}
						className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
						goto="/learnmore"
					></Button> */}
				</div>
			</div>
		</div>
	);
};
Hero.defaultProps = {
	title: 'Hero Title',
	sub: 'Hero Sub',
	btnText: 'Button',
};

export default Hero;
