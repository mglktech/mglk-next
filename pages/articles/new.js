import Layout from '../../layouts/Default';
import Preview from '../../components/Markdown/Preview';
import ArticleEditor from '../../components/Markdown/ArticleEditor';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';

const Editor = ({ article }) => {
	const router = useRouter();
	const [form, setForm] = useState({
		author: article.author._id,
		title: article.title,
		description: article.description,
		imgurl: article.imgurl,
		imgheight: article.imgheight,
		content: article.content,
	});
	const createArticle = async () => {
		try {
			const res = await fetch('/api/articles', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			router.push('/articles');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Layout>
			<div className="px-5 space-x-5 text-gray-700 bg-gray-300 grid grid-cols-12">
				<div className="col-span-5">
					<ArticleEditor
						article={article}
						form={form}
						setForm={setForm}
						doSubmit={createArticle}
					/>
				</div>
				<div className="col-span-7">
					<Preview article={form} />
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

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
			article: {
				author: session.user,
				title: '',
				description: '',
				imgurl: '',
				content: '',
				imgheight: '',
			},
		},
	};
}

export default Editor;
