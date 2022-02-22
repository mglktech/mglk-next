// Project file Previews
// Project File Editor
import { useState } from 'react';
import { HeaderIconSub } from './base';
import CardPreview from './projects/CardPreview';
import PagePreview from './projects/PagePreview';
import NotFound from './projects/NotFound';
import { Form, Input, Button, Label } from 'semantic-ui-react';

// Project is imported from the page itself, as well as setProject so that the original form can be modified by this component.
export const ProjectEditor = ({ project, setProject, errorLabel }) => {
	const [url, setUrl] = useState(project.headerImage_url);
	const handleUrlChange = (e) => {
		setUrl(e.target.value);
	};
	const ClearUrl = (e) => {
		setUrl('');
	};
	const SetUrl = () => {
		//setProject();
	};

	return (
		<Form className="bg-gray-100 p-4">
			<Form.Field>
				<HeaderIconSub
					content="Editor"
					icon="file"
					sub="For editing your project"
				/>
			</Form.Field>
			{errorLabel ? (
				<Form.Field>
					<Label color="red" content={errorLabel}></Label>
				</Form.Field>
			) : (
				<></>
			)}
			<Form.Field required>
				<label>Title</label>
				<Input
					name="title"
					value={project.title}
					placeholder="Project Title"
					onChange={setProject}
				/>
			</Form.Field>
			<Form.Field required>
				<label>Short Description</label>
				<Form.TextArea
					name="description"
					value={project.description}
					onChange={setProject}
					placeholder="Project Description"
				/>
			</Form.Field>
			<Form.Group>
				<Form.Input
					label="Header Image Link"
					onChange={handleUrlChange}
					//placeholder={url}
					value={url}
					action={
						<Button
							name="headerImage_url"
							icon="arrow right"
							color="teal"
							onClick={() => SetUrl()}
						/>
					}
					required
				></Form.Input>
				<Form.Input
					name="headerImage_height"
					label={`Header Size: ${project.headerImage_height}em `}
					min={0}
					max={50}
					onChange={setProject}
					step={0.5}
					type="range"
					value={project.headerImage_height}
				/>
			</Form.Group>
			<Form.Field>
				<label>Markdown</label>
				<Form.TextArea
					name="content"
					value={project.content}
					onChange={setProject}
					rows="10"
					placeholder="This is the contents of your Project Article. This is published as a document"
				/>
			</Form.Field>
		</Form>
	);
};

export const ProjectPreview = ({ project }) => {
	return (
		<Form className="bg-gray-100 p-4">
			<Form.Group>
				<HeaderIconSub
					content="Preview"
					icon="file"
					sub="See your live updates"
				/>
			</Form.Group>
			<Form.Field label="Card Preview" />
			<Form.Group>
				<CardPreview project={project} />
			</Form.Group>
			<Form.Field label="Page Preview" />
			<Form.Group>
				<PagePreview project={project} />
			</Form.Group>
		</Form>
	);
};
