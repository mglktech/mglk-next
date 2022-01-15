import DefaultLayout from '../../layouts/Default';
// import { Container, Header, Button } from 'semantic-ui-react';

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Container } from 'semantic-ui-react';
import { useRouter } from 'next/router';
const Index = ({ articles }) => {
	const router = useRouter();
	return (
		<DefaultLayout>
			<Container text>
				<h1>Articles</h1>
				<div className="grid wrapper">
					{articles.map((article) => {
						return (
							<div key={article._id}>
								<Card>
									<Card.Content>
										<Card.Header>
											<Link href={`/${article._id}`}>
												<a>{article._id}</a>
											</Link>
										</Card.Header>
									</Card.Content>
									<Card.Content extra>
										<Link href={`/articles/${article._id}`}>
											<Button primary>View</Button>
										</Link>
										<Link href={`/articles/${article._id}/edit`}>
											<Button primary>Edit</Button>
										</Link>
									</Card.Content>
								</Card>
							</div>
						);
					})}
				</div>

				<Button onClick={() => router.push('/articles/new')}>New</Button>
			</Container>
		</DefaultLayout>
	);
};

Index.getInitialProps = async () => {
	const res = await fetch('http://localhost:3000/api/articles');
	const { data } = await res.json();

	return { articles: data };
};

export default Index;
