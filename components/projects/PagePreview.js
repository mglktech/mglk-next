import { Form } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import NotFound from './NotFound';
const PagePreview = ({ project }) => {
	const headerImageStyling = (h, url) => {
		return {
			width: `100%`,
			height: `${h}em`,
			background: `url('${url}') center / cover`,
		};
	};
	if (!project) {
		return <NotFound />;
	}
	return (
		<div className="markdown-body w-full h-full rounded overflow-auto bg-white">
			<div
				style={headerImageStyling(
					project.headerImage_height,
					project.headerImage_url
				)}
			></div>
			<ReactMarkdown className="p-5" remarkPlugins={[remarkGfm]}>
				{project.content}
			</ReactMarkdown>
		</div>
	);
};

export default PagePreview;

// <div className="p-2">
// 				<Header as="h5" floated="right">
// 					Written By: {article.author?.username || '(not found)'}
// 					{/* <Header.Content className=" justify-center align-center content-center"></Header.Content> */}
// 					{/* <Image circular src={article.author.image_url} className="p-2" /> */}
// 					{article.createdAt ? (
// 						<>
// 							<Header.Subheader>
// 								Created on <Moment format="LL">{article.createdAt}</Moment>
// 							</Header.Subheader>
// 							<Header.Subheader>
// 								Updated on <Moment format="LL">{article.updatedAt}</Moment>
// 							</Header.Subheader>
// 						</>
// 					) : (
// 						<></>
// 					)}
// 				</Header>
// 			</div>
