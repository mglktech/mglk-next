import Link from 'next/link';
import Layout from '../../../layouts/ArticleEditor';
import Preview from '../../../components/Markdown/Preview';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader, Container, Image } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const EditArticle = ({ article }) => {
	const [form, setForm] = useState({
		content: article.content,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const router = useRouter();

	useEffect(() => {
		if (isSubmitting) {
			if (Object.keys(errors).length === 0) {
				updateArticle();
			} else {
				setIsSubmitting(false);
			}
		}
	}, [errors]);

	const updateArticle = async () => {
		try {
			const res = await fetch(
				`http://localhost:3000/api/articles/${router.query.id}`,
				{
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(form),
				}
			);
			router.push(`/articles/${router.query.id}`);
		} catch (error) {
			console.log(error);
		}
	};

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
			err.content = 'Content is required';
		}

		return err;
	};

	return (
		<Layout>
			<main className="px-5 py-10 space-x-5 text-gray-700 bg-gray-300 min-h-screen grid grid-cols-12">
				<div className="flex flex-col col-span-5">
					{isSubmitting ? (
						<Loader active inline="centered" />
					) : (
						<Form onSubmit={handleSubmit}>
							<Form.Input
								size="large"
								label="Title"
								placeholder="Your Article Title Here"
							/>
							<Form.Input
								inline
								label="Image Source"
								placeholder="http://www.example.com/image.jpg"
							/>
							<Image
								fluid
								className="my-3"
								alt="Fire Dancer"
								// src="/bin/fire_dancer.jpg"
								rounded
							/>

							<Form.TextArea
								rows="10"
								label="Description"
								placeholder="Your Article Description Here"
							/>

							<Form.TextArea
								fluid
								label="Content"
								placeholder="Article's Content"
								name="content"
								rows="30"
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
							<Button
								onClick={() => router.push(`/articles/${router.query.id}`)}
							>
								Back
							</Button>
							<Button type="submit">Update</Button>
						</Form>
					)}
				</div>
				<div className="col-span-7">
					<Preview text={form.content} />
				</div>
			</main>
		</Layout>
	);
};

EditArticle.getInitialProps = async ({ query: { id } }) => {
	const res = await fetch(`http://localhost:3000/api/articles/${id}`);
	const { data } = await res.json();

	return { article: data };
};

export default EditArticle;
