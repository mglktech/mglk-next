import DefaultLayout from '../layouts/Default';
import Hero from '../components/Hero/Hero';

export default function Home() {
	return (
		<div className="App">
			<DefaultLayout>
				<Hero
					title="Now built with Next.JS!"
					sub="The Serverside Rendered Framework."
					btnText="Learn More"
				/>
			</DefaultLayout>
		</div>
	);
}
