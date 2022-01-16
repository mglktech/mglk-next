import DefaultLayout from '../../layouts/Default';
// import { Container, Header, Button } from 'semantic-ui-react';
import ArticleFlow from '../../components/Markdown/ArticleFlow';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Container, Image, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const Index = ({ articles }) => {
	const router = useRouter();
	return (
		<DefaultLayout>
			<Container>
				<h1>Articles</h1>
				{/* <div className="grid grid-flow-col grid-cols-4"> */}
				<Card.Group itemsPerRow={3} className="justify-center">
					<ArticleFlow articles={articles} />
					<Card
						style={{
							height: '360px',
						}}
					>
						<Button
							icon
							className="h-full"
							onClick={() => router.push(`/articles/new`)}
						>
							<Icon name="add circle" size="big" />
						</Button>
					</Card>
				</Card.Group>

				{/* </div> */}
			</Container>
		</DefaultLayout>
	);
};

// Index.getInitialProps = async (ctx) => {
// 	try {
// 		const { data } = await fetch(`/api/articles`).then((res) => res.json());
// 		return { articles: data };
// 	} catch (err) {
// 		console.log(err);
// 		return {};
// 	}
// };
export async function getServerSideProps(ctx) {
	const res = await fetch(`http://${ctx.req.headers.host}/api/articles/`);
	const { data } = await res.json();
	//console.log(data);
	return {
		props: {
			articles: data,
		},
	};
}

export default Index;
