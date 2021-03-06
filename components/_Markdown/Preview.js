import { urlObjectKeys } from 'next/dist/shared/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Image, Header } from 'semantic-ui-react';
import Moment from 'react-moment';
import 'moment-timezone';

const Preview = ({ article, author }) => {
	const headerImageStyling = (url, imgheight) => {
		return {
			width: `100%`,
			height: `${imgheight}em`,
			background: `url('${url}') center / cover`,
		};
	};

	return (
		<div className="markdown-body w-full h-full rounded overflow-auto bg-white">
			<div style={headerImageStyling(article.imgurl, article.imgheight)}></div>
			<div className="p-2">
				<Header as="h5" floated="right">
					Written By: {article.author?.username || '(not found)'}
					{/* <Header.Content className=" justify-center align-center content-center"></Header.Content> */}
					{/* <Image circular src={article.author.image_url} className="p-2" /> */}
					{article.createdAt ? (
						<>
							<Header.Subheader>
								Created on <Moment format="LL">{article.createdAt}</Moment>
							</Header.Subheader>
							<Header.Subheader>
								Updated on <Moment format="LL">{article.updatedAt}</Moment>
							</Header.Subheader>
						</>
					) : (
						<></>
					)}
				</Header>
			</div>
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
