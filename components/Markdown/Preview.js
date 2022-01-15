import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Preview = (props) => {
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
		<div className="markdown-body border rounded p-5 w-full h-full">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{props.text}</ReactMarkdown>
		</div>
	);
};
Preview.defaultProps = {
	text: 'No Text',
};

export default Preview;
