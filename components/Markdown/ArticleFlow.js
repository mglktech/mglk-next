import React from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Container, Image, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
const ArticleFlow = ({ articles }) => {
	const router = useRouter();
	const headerImageStyling = (url) => {
		return {
			width: '100%',
			height: '45%',
			background: `url('${url}') center / cover`,
		};
	};
	return (
		<>
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
		</>
	);
};

export default ArticleFlow;
