import { List, Label } from 'semantic-ui-react';
const IndexListItem = ({ lblKey, lblValue }) => {
	return (
		<List.Item>
			<Label color="grey">
				{lblKey}
				<Label.Detail>{lblValue}</Label.Detail>
			</Label>
		</List.Item>
	);
};

export default IndexListItem;
