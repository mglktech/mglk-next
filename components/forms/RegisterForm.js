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
} from 'semantic-ui-react';
import { FormHeader } from './FormComponents';

export const RegisterForm = () => {
	const [form, setForm] = useState({ email: '', password: '' });
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
		<Container text className="pt-10">
			<Segment>
				<FormHeader
					content="Create an Account"
					icon="user plus"
					sub="Fill out the form below to create your account"
					divider
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
