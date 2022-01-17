import Link from 'next/link';
import Layout from '../../layouts/ArticleEditor';
import Preview from '../../components/Markdown/Preview';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import {
	Button,
	Form,
	Loader,
	Container,
	Image,
	Header,
	Icon,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';

const EditArticle = ({ article, form, setForm, doSubmit }) => {
	//const [imgSrc, setImgSrc] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const router = useRouter();

	useEffect(() => {
		if (isSubmitting) {
			if (Object.keys(errors).length === 0) {
				// if (article._id) {
				// 	updateArticle();
				// 	return;
				// }
				// createArticle();
				// return;
				doSubmit();
			}
			setIsSubmitting(false);
		}
	}, [errors]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let errs = validate();
		setErrors(errs);
		setIsSubmitting(true);
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const validate = () => {
		let err = {};

		if (!form.content) {
			err.title = 'Title is required';
			err.description = 'Description is required';
			err.imgsrc = 'Image is required';
			err.imgheight = 'Image height cannot be 0';
			err.content = 'Content is required';
		}

		return err;
	};

	return (
		<>
			{isSubmitting ? (
				<Loader active inline="centered" />
			) : (
				<Form onSubmit={handleSubmit} className="">
					<Header as="h2">
						<Icon name="edit" />
						<Header.Content>
							Article Editor
							<Header.Subheader>
								{article._id ? `_id: ${article._id}` : `Creating new article`}
							</Header.Subheader>
							<Header.Subheader>
								{article.author ? `Author: ${article.author}` : `Author: ...`}
							</Header.Subheader>
						</Header.Content>
					</Header>
					<Form.Input
						size="large"
						label="Title"
						name="title"
						value={form.title}
						error={
							errors.title
								? {
										content: 'Please enter a Title',
										pointing: 'below',
								  }
								: null
						}
						placeholder="Your Article Title Here"
						onChange={handleChange}
					/>
					<Form.Group>
						<Form.Input
							name="imgurl"
							value={form.imgurl}
							label="Image Source"
							placeholder="http://www.example.com/image.jpg"
							onChange={(e) => {
								handleChange(e);
								//setImgSrc(e.target.value);
							}}
						/>
						<Form.Input
							onChange={(e) => {
								handleChange(e);
							}}
							name="imgheight"
							value={form.imgheight}
							label="Image Height"
							placeholder="0"
						></Form.Input>
					</Form.Group>

					<Form.TextArea
						name="description"
						rows="6"
						value={form.description}
						label="Description"
						placeholder="Your Article Description Here"
						onChange={handleChange}
					/>

					<Form.TextArea
						fluid="true"
						label="Content"
						placeholder="Article's Content"
						name="content"
						rows="18"
						error={
							errors.content
								? {
										content: 'Please enter some content!',
										pointing: 'below',
								  }
								: null
						}
						value={form.content}
						onChange={handleChange}
					/>
					<div className="flex justify-end">
						<Button
							secondary
							onClick={() => {
								if (article._id) {
									router.push(`/articles/${article._id}`);
									return;
								}
								router.push(`/articles`);
							}}
						>
							Back
						</Button>
						<Button primary type="submit">
							{article._id ? 'Update' : 'Create'}
						</Button>
					</div>
				</Form>
			)}
		</>
	);
};

// EditArticle.getInitialProps = async ({ query: { id } }) => {
// 	const res = await fetch(`/api/articles/${id}`);
// 	const { data } = await res.json();
// 	console.log(data);
// 	if (!data) {
// 		return {
// 			article: {
// 				title: '',
// 				description: '',
// 				imgurl: '',
// 				content: '',
// 			},
// 		};
// 	}
// 	return { article: data };
// };

export default EditArticle;
