import Link from 'next/link';
import Layout from '../../../layouts/ArticleEditor';
import Preview from '../../../components/Markdown/Preview';
import ArticleEditor from '../../../components/Markdown/ArticleEditor';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader, Container, Image } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const EditArticle = ({ article }) => {
	const [form, setForm] = useState({
		title: article.title,
		description: article.description,
		imgurl: article.imgurl,
		content: article.content,
	});
	//const [imgSrc, setImgSrc] = useState('');
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
			const res = await fetch(`/api/articles/${router.query.id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
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
			err.title = 'Title is required';
			err.description = 'Description is required';
			err.imgsrc = 'Image is required';
			err.content = 'Content is required';
		}

		return err;
	};

	return (
		<Layout>
			<main className="px-5 py-10 space-x-5 text-gray-700 bg-gray-300 grid grid-cols-12">
				<div className="col-span-5">
					<ArticleEditor article={article} form={form} setForm={setForm} />
				</div>
				<div className="col-span-7">
					<Preview text={form.content} />
				</div>
			</main>
		</Layout>
	);
};

EditArticle.getInitialProps = async ({ query: { id } }) => {
	const res = await fetch(`/api/articles/${id}`);
	const { data } = await res.json();
	if (!data) {
		return {
			article: {
				title: '',
				description: '',
				imgurl: '',
				content: '',
			},
		};
	}
	return { article: data };
};

//export default EditArticle;

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
				<div className="col-span-5 py-5">
					<ArticleEditor article={article} form={form} setForm={setForm} />
				</div>
				<div className="col-span-7 py-5 h-screen">
					<Preview article={form} />
				</div>
			</main>
		</Layout>
	);
};

Editor.getInitialProps = async ({ query: { id } }) => {
	const res = await fetch(`/api/articles/${id}`);
	const { data } = await res.json();
	if (!data) {
		return {
			article: {
				title: '',
				description: '',
				imgurl: '',
				content: '',
			},
		};
	}
	return { article: data };
};

export default Editor;
