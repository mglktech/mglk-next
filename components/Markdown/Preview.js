import { urlObjectKeys } from 'next/dist/shared/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Image, Header } from 'semantic-ui-react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Preview = ({ article }) => {
	// markdown render is props.text
	// const components = {
	// 	code({ node, inline, className, children, ...props }) {
	// 		const match = /language-(\w+)/.exec(className || '');
	// 		return !inline && match ? (
	// 			<SyntaxHighlighter
	// 				c
	// 				style={atomDark}
	// 				language={match[1]}
	// 				PreTag="div"
	// 				{...props}
	// 			>
	// 				{String(children).replace(/\n$/, '')}
	// 			</SyntaxHighlighter>
	// 		) : (
	// 			<code className={className} {...props}>
	// 				{children}
	// 			</code>
	// 		);
	// 	},
	// };
	const headerImageStyling = (url, imgheight) => {
		return {
			width: `100%`,
			height: `${imgheight}em`,
			background: `url('${url}') center / cover`,
		};
	};
	console.log(article);
	return (
		<div className="markdown-body w-full h-full rounded overflow-auto bg-white">
			<div style={headerImageStyling(article.imgurl, article.imgheight)}></div>
			<Header as="h1" textAlign="center">
				{article.title}
			</Header>
			<Header as="h5">{article.description}</Header>
			<ReactMarkdown className="p-5" remarkPlugins={[remarkGfm]}>
				{article.content}
			</ReactMarkdown>
		</div>
	);
};
Preview.defaultProps = {
	text: 'No Text',
};

export default Preview;
