import Layout from '../../layouts/ArticleEditor';
import Preview from '../../components/Markdown/Preview';
import ArticleEditor from '../../components/Markdown/ArticleEditor';
import { useState } from 'react';

const Editor = ({ article }) => {
	const [form, setForm] = useState({
		title: article.title,
		description: article.description,
		imgurl: article.imgurl,
		content: article.content,
	});
	return (
		<Layout>
			<main className="px-5 space-x-5 text-gray-700 bg-gray-300 min-h-screen grid grid-cols-12">
				<div className="col-span-5 py-5 h-screen">
					<ArticleEditor article={article} form={form} setForm={setForm} />
				</div>
				<div className="col-span-7 py-5 h-screen">
					<Preview article={form} />
				</div>
			</main>
		</Layout>
	);
};

Editor.getInitialProps = async () => {
	return {
		article: {
			title: '',
			description: '',
			imgurl: '',
			content: '',
		},
	};
};

export default Editor;
