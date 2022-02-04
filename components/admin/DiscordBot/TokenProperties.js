import { Form, Checkbox, Button, Label, Icon, List } from 'semantic-ui-react';
import { InputInitiallyHidden } from '../../base';
import Moment from 'react-moment';
import 'moment-timezone';
const TokenProperties = ({ bot, useRefreshToken }) => {
	const expiry_date = () => {
		let d = new Date(bot?.data.updatedAt);
		d = new Date(d.getTime() + bot?.data.expires_in);
		//console.log(resultDate);
		return d;
	};
	const inDate = () => {
		const td = new Date().getTime();
		if (td < expiry_date()) {
			return true;
		}
		return false;
	};
	return (
		<>
			<Form.Field>
				<List>
					<List.Header>Token Properties</List.Header>
					<Button
						compact
						floated="right"
						icon="refresh"
						color="teal"
						content="Refresh Token"
						onClick={useRefreshToken}
					></Button>
					<List.Item>
						<Label>
							Client ID:
							<Label.Detail>{bot.data.client_id}</Label.Detail>
						</Label>
					</List.Item>
					<List.Item>
						<Label>
							Database ID:
							<Label.Detail>{bot.data._id}</Label.Detail>
						</Label>
					</List.Item>
					<List.Item>
						<InputInitiallyHidden
							pre="Access Token"
							text={bot.data.access_token}
						/>
					</List.Item>
					<List.Item>
						<InputInitiallyHidden
							pre="Refresh Token"
							text={bot.data.refresh_token}
						/>
					</List.Item>
					<List.Item>
						<div className="flex justify-between">
							<Label color="orange">
								<Icon name="time" />
								Token Lifetime
								<Label.Detail>
									<Moment from={bot?.data.expires_in}></Moment>
								</Label.Detail>
							</Label>
							<Label>
								Updated{' '}
								<Moment
									date={bot?.data.updatedAt}
									interval={10000}
									fromNow
									// format="hh:mm:ss"
								/>
							</Label>
							{inDate() ? (
								<>
									<Label color="green">
										Expires{' '}
										<Moment
											date={expiry_date()}
											interval={10000}
											fromNow
											// format="hh:mm:ss"
										/>
									</Label>
								</>
							) : (
								<>
									<Label color="red">Token Expired</Label>
								</>
							)}
						</div>
					</List.Item>
				</List>
			</Form.Field>
		</>
	);
};

export default TokenProperties;
