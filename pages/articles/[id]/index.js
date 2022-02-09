import { DefaultLayout as Style } from '../../../layouts/DefaultLayout';
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
// import dbConnect from '../../../lib/dbConnect';
// import Articles from '../../../models/Article';

const Article = ({ article }) => {
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
		<>
			<Style>
				<Container fluid>
					<div className="grid grid-cols-12">
						<div className="lg:col-span-2 col-span-2">
							<div className="flex flex-row-reverse">
								<div className="flex flex-col space-y-1 py-1 fixed">
									<Button onClick={() => router.push(`/articles/`)}>
										Back
									</Button>
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
									<Preview article={article} />
								</>
							)}
						</div>
						<div></div>
					</div>

					<Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
				</Container>
			</Style>
		</>
	);
};

export async function getServerSideProps(ctx) {
	// Get article info from database
	// Get author data from database
	//await dbConnect();
	//console.log(ctx);
	const id = ctx?.query?.id;
	try {
		const res = await fetch(
			`http://${ctx.req.headers.host}/api/articles/${id}`
		);
		//console.log(res);
		if (res.status === 400) {
			console.log(res.statusText);
			return {
				props: {
					article: null,
				},
			};
		}
		const { data } = await res.json();
		return {
			props: {
				article: data,
			},
		};
	} catch {
		return {
			props: {
				article: null,
			},
		};
	}

	// const article = await Articles.findById(id).then((result) => {
	// 	const article = result.toObject();
	// 	article._id = article._id.toString();
	// 	article.author = article.author.toString();
	// 	return article;
	// });

	//console.log(article);
	//const json = JSON.stringify(article);
	//console.log(article);
	//const author = await
	//console.log(article);
	// try {
	// 	const res = await fetch(
	// 		`http://${ctx.req.headers.host}/api/articles/${id}`
	// 	);
	// 	const { data } = await res.json();
	// 	const user_id = data?.author;
	// 	//console.log(user_id);
	// 	let authorData = null;
	// 	if (user_id) {
	// 		authorData = await fetch(
	// 			`http://${ctx.req.headers.host}/api/users/${user_id}`
	// 		).then(({ data }) => data.json());
	// 	}
	// 	return {
	// 		props: {
	// 			author: authorData,
	// 			article: data,
	// 		},
	// 	};
	// } catch (err) {
	// 	let { author, article } = null;
	// 	return {
	// 		props: {
	// 			author,
	// 			article,
	// 		},
	// 	};
	// }

	//console.log(data);
}

export default Article;
