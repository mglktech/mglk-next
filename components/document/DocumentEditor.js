import MDEditor from '../MDEditor';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
export const DocumentEditor = ({ id }) => {
	const [content, setContent] = useState(null);
	const [activeItem, setActiveItem] = useState('cardeditor');
	const [formFetched, setFormFetched] = useState(false);
	const [initialForm, setInitialForm] = useState(null);
	const [form, setForm] = useState(null);
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
		//console.log(form);
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
				setContent(data?.content);
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
			//console.log('OK: ', res.ok, 'Response Data: ', response);
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
			<div>
				<MDEditor height="100%" value={content} onChange={setContent} />
			</div>
		</>
	);
};
