import dynamic from 'next/dynamic';
import { useState } from 'react';

const MarkdownEditor = dynamic(
	() => import('@uiw/react-markdown-editor').then((mod) => mod.default),
	{
		ssr: false,
	}
);

const Markdown = dynamic(
	() => import('@uiw/react-markdown-preview').then((mod) => mod.default),
	{ ssr: false }
);

export const MDPreview = ({ source }) => {
	if (typeof source !== 'string') {
		source = '(no data...)';
	}
	return (
		<div data-color-mode="light">
			<Markdown source={source} />
		</div>
	);
};

export const MDEditor = () => {
	const [value, setValue] = useState('this is a textarea');
	const handleChange = (value) => {
		setValue(value);
	};

	return (
		<div data-color-mode="light">
			<MarkdownEditor value={value} onChange={handleChange} height={200} />
		</div>
	);
};
