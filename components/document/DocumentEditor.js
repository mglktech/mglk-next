import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Segment,
	Sidebar,
	Visibility,
	Label,
	Input,
	Form,
	Message,
	Loader,
	Card,
} from 'semantic-ui-react';
import { FormHeader } from '../forms/FormComponents';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import Moment from 'react-moment';
import 'moment-timezone';

const CardEditor = ({ form, handleChange }) => {
	return (
		<>
			<Grid>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Form.Field
							name="title"
							label="Title"
							control="input"
							value={form.title}
							placeholder={formDefault.title}
							onChange={handleChange}
						/>
						<Form.Field
							name="description"
							label="Short Description"
							control="textarea"
							value={form.description}
							placeholder={formDefault.description}
							onChange={handleChange}
							rows={15}
						/>
					</Grid.Column>
					<Grid.Column>
						<Form.Field
							name="headerImage_url"
							label="Header image link"
							control="input"
							value={form.headerImage_url}
							placeholder={formDefault.headerImage_url}
							onChange={handleChange}
						/>
						<div className="flex justify-center">
							<CardPreview form={form} />
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
};
const MarkdownEditor = ({ form, handleChange }) => {
	return (
		<>
			<Form.Field
				name="content"
				control="textarea"
				rows={25}
				onChange={handleChange}
				value={form.content}
			/>
			<Header>Preview</Header>

			<MarkdownPreview form={form} />
		</>
	);
};
export const MarkdownPreview = ({ form }) => {
	const headerImageStyling = (h, url) => {
		return {
			width: `100%`,
			height: `${20}em`,
			background: `url('${url}') center / cover`,
		};
	};
	if (!form) {
		return <NotFound />;
	}
	return (
		<Segment raised style={{ padding: '0px', margin: '0px' }}>
			<div className="markdown-body w-full h-full rounded overflow-auto bg-white">
				<div
					style={headerImageStyling(
						form.headerImage_height,
						form.headerImage_url
					)}
				></div>
				<Button.Group floated="right">
					<Button
						compact
						as="a"
						content="Modify"
						href={`/documents/${form._id}/edit`}
						color="teal"
						floated="right"
						icon="edit outline"
					/>
				</Button.Group>
				<ReactMarkdown
					className="p-5"
					rehypePlugins={[rehypeHighlight]}
					remarkPlugins={[remarkGfm]}
				>
					{form.content}
				</ReactMarkdown>
			</div>
		</Segment>
	);
};
const CardPreview = ({ form }) => {
	const headerImageStyling = {
		width: '100%',
		minHeight: '8.75em',
		background: `url("${form.headerImage_url}") center / cover`,
	};
	return (
		<Card
			style={{
				width: '20em',
				minHeight: '22em',
			}}
		>
			{/* <Image src={form.headerImage_url} fluid /> */}
			<div style={headerImageStyling}></div>
			<Card.Content>
				<Card.Header>{form.title}</Card.Header>
				<Divider fitted />
				<p className="text-lg">{form.description}</p>
			</Card.Content>
			<Card.Content extra className="flex justify-center">
				<Button disabled content="Read More"></Button>
			</Card.Content>
		</Card>
	);
};

const DocumentMenu = ({ activeItem, handleItemClick, form, initialForm }) => {
	const router = useRouter();
	const deleteForm = async () => {
		const result = await fetch(`/api/documents/${form._id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		router.push('/admin?initctx=documents');
		return;
	};
	//console.log('form', form, 'initialForm', initialForm);
	return (
		<Menu attached="top" tabular>
			<Menu.Item
				name="cardeditor"
				active={activeItem === 'cardeditor'}
				onClick={handleItemClick}
			>
				Card Editor
			</Menu.Item>
			<Menu.Item
				name="markdowneditor"
				active={activeItem === 'markdowneditor'}
				onClick={handleItemClick}
			>
				Markdown Editor
			</Menu.Item>
			<Menu.Item>
				{form.updatedAt ? (
					<>
						<Label
							content={`saved `}
							detail={
								<Moment
									date={form.updatedAt}
									interval={10000}
									fromNow
									// format="hh:mm:ss"
								/>
							}
						/>
					</>
				) : (
					<></>
				)}
			</Menu.Item>
			<Menu.Item position="right">
				<Button.Group>
					<Button
						as="a"
						href="/admin?initctx=documents"
						content="Back"
						labelPosition="left"
						icon="arrow left"
					/>
					<Button
						color="red"
						icon="trash"
						labelPosition="left"
						content="Delete"
						onClick={deleteForm}
					/>
					<Button
						color="green"
						icon="save"
						labelPosition="right"
						content="Save"
						type="submit"
						disabled={form === initialForm ? true : false}
					/>
				</Button.Group>
			</Menu.Item>
		</Menu>
	);
};

const EditorContent = ({ activeItem, form, handleChange }) => {
	switch (activeItem) {
		case 'cardeditor':
			return <CardEditor form={form} handleChange={handleChange} />;
		case 'markdowneditor':
			return (
				<>
					<MarkdownEditor form={form} handleChange={handleChange} />
				</>
			);
	}
	return <></>;
};

const formDefault = {
	headerImage_url:
		'https://randomwordgenerator.com/img/picture-generator/52e6d5434e53a514f1dc8460962e33791c3ad6e04e507749712e79d3954bc3_640.jpg',
	title: 'This Editor Does Allow For Longer Titles',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  ',
	content: `# Example Title
Example Text`,
};

export const DocumentEditor = ({ id }) => {
	const [activeItem, setActiveItem] = useState('cardeditor');
	const [formFetched, setFormFetched] = useState(false);
	const [initialForm, setInitialForm] = useState(formDefault);
	const [form, setForm] = useState(formDefault);
	const [isSaving, setIsSaving] = useState(false);
	const [lastSaved, setLastSaved] = useState(false);
	const [errors, setErrors] = useState({});
	const router = useRouter();
	const soft_validate = () => {
		// Clientside validation
		let err = {};
		if (!form.title) {
			err.title = 'Please enter a Title!';
		}
		if (!form.description) {
			err.description = 'Please enter a Description!';
		}
		if (!form.headerImage_url) {
			err.headerImage_url = 'Please enter an Image URL!';
		}
		return err;
	};

	const handleItemClick = (e, { name }) => {
		//console.log(e);
		setActiveItem(name);
	};
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		setErrors({
			...errors,
			[e.target.name]: '',
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		let errs = soft_validate();
		setErrors(errs);
		setIsSaving(true);
	};
	useEffect(() => {
		const fetchForm = async () => {
			const res = await fetch(`/api/documents/${id}`);
			const data = await res.json();
			if (res.ok) {
				setInitialForm(data);
				setForm(data);
			}
		};
		const saveForm = async () => {
			const res = {};
			if (id) {
				res = await fetch(`/api/documents/${id ? id : ''}`, {
					method: 'PUT',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(form),
				});
			}
			if (!id) {
				res = await fetch('/api/documents', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(form),
				});
			}
			const response = await res.json();
			console.log('OK: ', res.ok, 'Response Data: ', response);
			if (res.ok) {
				setLastSaved(true);
				setForm(response);
				setInitialForm(response); // Sync current form and initial form data (so save button disables)
				//console.log(response);
				if (!id) {
					router.push(`/documents/${response._id}/edit`);
					return;
				}
			}

			let err = { form: response.message };
			setErrors(err);
			return;
		};
		if (id && !formFetched) {
			fetchForm();
			setFormFetched(true);
		}
		if (isSaving) {
			if (Object.keys(errors).length === 0) {
				saveForm();
			}
			setIsSaving(false);
		}
	}, [errors, form, formFetched, id, isSaving, router]);
	return (
		<>
			<Container>
				<Segment basic>
					<FormHeader
						content="Document Editor"
						sub={
							id ? (
								<Label color="black" content="_id:" detail={id} />
							) : (
								<Label color="black" content="New Document" />
							)
						}
						icon="wrench"
					/>

					<Form onSubmit={handleSubmit}>
						<DocumentMenu
							activeItem={activeItem}
							handleItemClick={handleItemClick}
							form={form}
							initialForm={initialForm}
						/>
						<Segment attached="bottom">
							<EditorContent
								activeItem={activeItem}
								form={form}
								handleChange={handleChange}
							/>
						</Segment>
					</Form>
				</Segment>
			</Container>
		</>
	);
};

const NotFound = () => {
	// not found stub
	return <>Page Not Found</>;
};

export const _DocumentEditor = () => {
	const [form, setForm] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submissionSuccessful, setSubmissionSuccessful] = useState(false);
	const [errors, setErrors] = useState({});
	const router = useRouter();

	const soft_validate = () => {
		// Clientside validation
		let err = {};
		if (!form.email || !form.email.includes('@')) {
			err.email = 'Please enter a valid Email Address';
		}
		if (!form.password || form.password.trim().length < 7) {
			err.password = 'Your password must be more than 7 characters long';
		}
		if (!form.confirmPassword || form.confirmPassword !== form.password) {
			err.confirmPassword = 'Password fields do not match';
		}
		return err;
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		setErrors({
			...errors,
			[e.target.name]: '',
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		let errs = soft_validate();
		setErrors(errs);
		setIsSubmitting(true);
	};

	useEffect(() => {
		const submitForm = async () => {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			if (!res.ok) {
				const response = await res.json();
				let err = { form: response.message };
				setErrors(err);
				return;
			}
			setSubmissionSuccessful(true);
		};
		if (isSubmitting) {
			if (Object.keys(errors).length === 0) {
				submitForm();
			}
			setIsSubmitting(false);
		}
	}, [errors, form, isSubmitting]);

	return (
		<Container>
			<Segment>
				<FormHeader
					content="Create an Account"
					icon="user plus"
					sub="Fill out the form below to create your account"
				/>
				{submissionSuccessful ? (
					<>
						<Form success>
							<Message
								success
								header="Account Created"
								content="Account creation successful. please login below."
							/>
							<Button
								color="purple"
								content="Sign In"
								icon="sign-in"
								labelPosition="right"
								onClick={() => signIn()}
							/>
						</Form>
					</>
				) : (
					<>
						<Form
							className=""
							onSubmit={handleSubmit}
							error={errors.form ? true : false}
						>
							<Message error content={errors.form} />
							<Form.Field
								name="email"
								label="Email"
								control="input"
								onChange={handleChange}
								error={errors.email ? { content: errors.email } : false}
							/>
							<Form.Field
								name="password"
								label="Password"
								control="input"
								type="password"
								onChange={handleChange}
								error={errors.password ? { content: errors.password } : false}
							/>
							<Form.Field
								name="confirmPassword"
								label="Confirm Password"
								control="input"
								type="password"
								onChange={handleChange}
								error={
									errors.confirmPassword
										? { content: errors.confirmPassword }
										: false
								}
							/>
							<Button
								content="Create Account"
								type="submit"
								loading={isSubmitting ? true : false}
							/>
						</Form>
					</>
				)}
			</Segment>
		</Container>
	);
};
