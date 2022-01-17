import Layout from '../../layouts/Default';
import Preview from '../../components/Markdown/Preview';
import ArticleEditor from '../../components/Markdown/ArticleEditor';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';

const Editor = ({ article }) => {
	const [form, setForm] = useState({
		title: article.title,
		description: article.description,
		imgurl: article.imgurl,
		imgheight: article.imgheight,
		content: article.content,
	});
	return (
		<Layout>
			<div className="px-5 space-x-5 text-gray-700 bg-gray-300 grid grid-cols-12">
				<div className="col-span-5">
					<ArticleEditor article={article} form={form} setForm={setForm} />
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
			article: {
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
