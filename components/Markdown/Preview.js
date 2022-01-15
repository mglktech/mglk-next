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

	return (
		<div className="markdown-body rounded w-full h-full overflow-auto bg-white">
			<Image
				fluid="true"
				alt="Image from Image Source"
				src={article.imgurl}
				rounded
			/>
			{/* <Header as="h1" textAlign="center">
				{article.title}
			</Header>
			<Header as="h5">{article.description}</Header> */}
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
