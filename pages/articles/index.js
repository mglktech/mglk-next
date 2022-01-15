import DefaultLayout from '../../layouts/Default';
// import { Container, Header, Button } from 'semantic-ui-react';

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Container, Image, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
const Index = ({ articles }) => {
	const router = useRouter();
	const headerImageStyling = (url) => {
		return {
			width: '100%',
			height: '45%',
			background: `url('${url}') center / cover`,
		};
	};
	return (
		<DefaultLayout>
			<Container>
				<h1>Articles</h1>
				{/* <div className="grid grid-flow-col grid-cols-4"> */}
				<Card.Group itemsPerRow={3} className="justify-center">
					{articles.map((article) => {
						return (
							//<div key={article._id} className="m-2">
							<Card
								key={article._id}
								style={{
									minWidth: '300px',
									minHeight: '360px',
								}}
							>
								<div style={headerImageStyling(article.imgurl)}></div>
								<Card.Content>
									<Card.Header>{article.title}</Card.Header>
									<p>{article.description}</p>
								</Card.Content>
								<Card.Content extra className="flex justify-evenly">
									<Button
										icon
										labelPosition="right"
										onClick={() => {
											router.push(`/articles/${article._id}/edit`);
										}}
									>
										Edit
										<Icon name="edit" />
									</Button>
									<Button
										icon
										primary
										labelPosition="right"
										onClick={() => router.push(`/articles/${article._id}`)}
									>
										View
										<Icon name="right arrow" />
									</Button>
								</Card.Content>
							</Card>
							//</div>
						);
					})}
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

Index.getInitialProps = async () => {
	const res = await fetch('/api/articles');
	const { data } = await res.json();

	return { articles: data };
};

export default Index;
