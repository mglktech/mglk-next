import Layout from '../../layouts/Default';
import Preview from '../../components/Markdown/Preview';
import ArticleEditor from '../../components/Markdown/ArticleEditor';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';

const Editor = () => {
	const router = useRouter();
	const { data: session } = useSession();
	//console.log(session);
	const [form, setForm] = useState({
		author: session.user.id,
		title: '',
		description: '',
		imgurl: '',
		imgheight: '',
		content: '',
	});

	const createArticle = async () => {
		try {
			const res = await fetch('https://discord.com/api/v8/oauth2/token', {
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
						article={form}
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

export default Editor;
Editor.auth = true;
