import CardPreview from './CardPreview';
const CardFlow = ({ projects }) => {
	return (
		<>
			{projects?.map((project) => (
				<CardPreview key={project._id} project={project}></CardPreview>
			))}
		</>
	);
};
export default CardFlow;
