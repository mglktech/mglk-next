import Style from '../../../layouts/Default';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader, Container } from 'semantic-ui-react';
import Preview from '../../../components/Markdown/Preview';

const Article = ({ article }) => {
	const [confirm, setConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (isDeleting) {
			deleteArticle();
		}
	}, [isDeleting]);

	const open = () => setConfirm(true);

	const close = () => setConfirm(false);

	const deleteArticle = async () => {
		const articleId = router.query.id;
		try {
			const deleted = await fetch(
				`http://localhost:3000/api/articles/${articleId}`,
				{
					method: 'Delete',
				}
			);

			router.push('/articles');
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		setIsDeleting(true);
		close();
	};

	return (
		<Style>
			<Container text>
				{isDeleting ? (
					<Loader active />
				) : (
					<>
						<Preview text={article.content} />
						<Button onClick={() => router.push(`/articles/`)}>Back</Button>
						<Button color="red" onClick={open}>
							Delete
						</Button>
						<Button
							primary
							onClick={() => router.push(`/articles/${router.query.id}/edit`)}
						>
							Edit
						</Button>
					</>
				)}
				<Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
			</Container>
		</Style>
	);
};

Article.getInitialProps = async ({ query: { id } }) => {
	const res = await fetch(`http://localhost:3000/api/articles/${id}`);
	const { data } = await res.json();

	return { article: data };
};

export default Article;
