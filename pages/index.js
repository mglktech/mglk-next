import DefaultLayout from '../layouts/Default';
import Hero from '../components/Hero/Hero';

export default function Home() {
	return (
		<div className="App">
			<DefaultLayout>
				<Hero title="Bespoke, Premium Apps" sub="For Your Virtual Business" />
			</DefaultLayout>
		</div>
	);
}
