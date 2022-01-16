import Link from 'next/link';
import Layout from '../../../layouts/Default';
import Preview from '../../../components/Markdown/Preview';
import ArticleEditor from '../../../components/Markdown/ArticleEditor';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader, Container, Image } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';

//export default EditArticle;

const Editor = ({ session, article }) => {
	const user = session?.user;

	//console.log(article);
	const [form, setForm] = useState({
		title: article.title,
		description: article.description,
		imgurl: article.imgurl,
		imgheight: article.imgheight,
		content: article.content,
	});

	return (
		<Layout>
			<main className="px-5 space-x-5 text-gray-700 bg-gray-300 grid grid-cols-12">
				<div className="w-1/3 py-5 fixed">
					<ArticleEditor article={article} form={form} setForm={setForm} />
				</div>
				<div className="col-start-5 col-end-12 py-5 h-full">
					<Preview article={form} />
				</div>
			</main>
		</Layout>
	);
};

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);
	const id = ctx?.query?.id;
	const res = await fetch(`http://${ctx.req.headers.host}/api/articles/${id}`);
	const { data } = await res.json();
	//console.log(data);
	if (!session) {
		return {
			redirect: {
				destination: '/accessDenied',
				permanent: false,
			},
		};
	}
	return {
		props: {
			session,
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
