import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Form, Loader } from 'semantic-ui-react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

const Editor = (props) => {
	const [form, setForm] = useState({ content: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const router = useRouter();
	useEffect(() => {
		if (isSubmitting) {
			if (Object.keys(errors).length === 0) {
				createArticle();
			} else {
				setIsSubmitting(false);
			}
		}
	}, [errors]);
	const createArticle = async () => {
		try {
			const res = await fetch('/api/articles', {
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
	const handleSubmit = (e) => {
		e.preventDefault();
		let errs = validate();
		setErrors(errs);
		setIsSubmitting(true);
	};
	const handleChange = (e) => {
		props.setText(e.target.value);
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
		// <article className="flex flex-col items-center rounded h-full">
		// 	<label htmlFor="markdown" className="mb-3">
		// 		Edit your code here:
		// 	</label>
		// 	<textarea
		// 		name="textarea"
		// 		id="markdown"
		// 		value={props.text}
		// 		onChange={(e) => props.setText(e.target.value)}
		// 		className="w-full h-full text-gray-900 tracking-wide p-5 rounded shadow"
		// 		placeholder="Type in something"
		// 	></textarea>

		// </article>
		<div className="form-container">
			<h1>Create Article</h1>
			<div>
				{isSubmitting ? (
					<Loader active inline="centered" />
				) : (
					<Form onSubmit={handleSubmit}>
						<Form.TextArea
							label="Article Content"
							placeholder="Place Article Content here!"
							name="content"
							id="content"
							value={props.text}
							error={
								errors.content
									? { content: 'Please enter some content!', pointing: 'below' }
									: null
							}
							onChange={handleChange}
						/>
						<Button type="submit">Create</Button>
					</Form>
				)}
			</div>
		</div>
	);
};

export default Editor;
