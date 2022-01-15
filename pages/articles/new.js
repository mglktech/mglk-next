import Layout from '../../layouts/ArticleEditor';
import Editor from '../../components/Markdown/Editor';
import Preview from '../../components/Markdown/Preview';
import Settings from '../../components/Markdown/Settings';
import { FaChevronCircleRight } from 'react-icons/fa';
//import  MarkdownStyle from '../markdown.module.css';
import { useState } from 'react';

const editor = () => {
	const [text, setText] = useState('');
	return (
		<Layout>
			<main className="px-5 py-10 space-x-5 text-gray-700 bg-gray-300 min-h-screen grid grid-cols-12">
				<div className="flex flex-col col-span-5">
					<Editor text={text} setText={setText} />
				</div>
				<div className="col-span-7">
					<Preview text={text} />
				</div>
			</main>
		</Layout>
	);
};

export default editor;
