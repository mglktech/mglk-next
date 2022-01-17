import Style from '../../../layouts/Default';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
	Confirm,
	Button,
	Loader,
	Container,
	Image,
	Header,
} from 'semantic-ui-react';
import Preview from '../../../components/Markdown/Preview';

const Article = ({ article, author }) => {
	const [confirm, setConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();
	const { data: session } = useSession();
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
			const deleted = await fetch(`/api/articles/${articleId}`, {
				method: 'Delete',
			});

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
			<Container fluid>
				<div className="grid grid-cols-12">
					<div className="lg:col-span-2 col-span-2">
						<div className="flex flex-row-reverse">
							<div className="flex flex-col space-y-1 py-1 fixed">
								<Button onClick={() => router.push(`/articles/`)}>Back</Button>
								{session ? (
									<>
										<Button
											primary
											onClick={() =>
												router.push(`/articles/${router.query.id}/edit`)
											}
										>
											Edit
										</Button>
										<Button color="red" onClick={open}>
											Delete
										</Button>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>

					<div className="lg:col-span-8 col-span-10">
						{isDeleting ? (
							<Loader active />
						) : (
							<>
								<Preview article={article} author={author} />
							</>
						)}
					</div>
					<div></div>
				</div>

				<Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
			</Container>
		</Style>
	);
};

export async function getServerSideProps(ctx) {
	const id = ctx?.query?.id;
	const res = await fetch(`http://${ctx.req.headers.host}/api/articles/${id}`);
	const { data } = await res.json();
	const user_id = data.author;
	//console.log(user_id);
	const { data: authorData } = await fetch(
		`http://${ctx.req.headers.host}/api/users/${user_id}`
	).then((res) => res.json());

	//console.log(data);
	return {
		props: {
			author: authorData ? authorData : null,
			article: data,
		},
	};
}

export default Article;
