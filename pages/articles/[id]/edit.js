import Link from 'next/link';
import { DefaultLayout as Layout } from '../../../layouts/DefaultLayout';
import Preview from '../../../components/Markdown/Preview';
import ArticleEditor from '../../../components/Markdown/ArticleEditor';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader, Container, Image } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';
import { FaCommentsDollar } from 'react-icons/fa';

//export default EditArticle;

const Editor = ({ article, author }) => {
	//console.log(article);
	//console.log(session);
	const router = useRouter();
	const { data: session } = useSession();
	//console.log(session.user.id);
	const [form, setForm] = useState(article);
	const updateArticle = async () => {
		try {
			const res = await fetch(`/api/articles/${router.query.id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});

			router.push(`/articles/${router.query.id}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<main className="px-5 space-x-5 text-gray-700 bg-gray-300 grid grid-cols-12">
				<div className="w-1/3 py-5 fixed">
					<ArticleEditor
						article={article}
						form={form}
						setForm={setForm}
						doSubmit={updateArticle}
					/>
				</div>
				<div className="col-start-5 col-end-12 py-5 h-full">
					<Preview article={form} author={author} />
				</div>
			</main>
		</Layout>
	);
};

export async function getServerSideProps(ctx) {
	//const session = await getSession(ctx);
	const id = ctx?.query?.id;
	const res = await fetch(`http://${ctx.req.headers.host}/api/articles/${id}`);
	const { data } = await res.json();
	const user_id = data.author;
	//console.log(user_id);
	const { data: authorData } = await fetch(
		`http://${ctx.req.headers.host}/api/users/${user_id}`
	).then((res) => res.json());

	// if (!session) {
	// 	return {
	// 		redirect: {
	// 			destination: '/accessDenied',
	// 			permanent: false,
	// 		},
	// 	};
	// }
	return {
		props: {
			//session,
			author: authorData ? authorData : null,
			article: data,
		},
	};
}

// Editor.getInitialProps = async ({ query: { id } }) => {
// 	const res = await fetch(`/api/articles/${id}`);
// 	const { data } = await res.json();
// 	if (!data) {
// 		return {
// 			article: {
// 				title: '',
// 				description: '',
// 				imgurl: '',
// 				content: '',
// 			},
// 		};
// 	}
// 	return { article: data };
// };

export default Editor;
Editor.auth = true;
