import { DefaultLayout } from '../layouts/DefaultLayout';

import {
	Button,
	Container,
	Header,
	Icon,
	Segment,
	Grid,
	List,
	Divider,
	Image,
	Popup,
	Label,
} from 'semantic-ui-react';
export default function Home() {
	return (
		<div className="App">
			<DefaultLayout title="Michael Kendall" hero={true}>
				<Segment inverted vertical style={{ padding: '5em 0em' }}>
					<Grid container stackable verticalAlign="middle">
						<Grid.Row>
							<Grid.Column width={8}>
								<Header
									inverted
									color="orange"
									as="h3"
									style={{ fontSize: '2em' }}
								>
									Professional Fire Performer
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									A keen interest for Pyrotechnics doesnt have to be a bad
									thing! Whats more, I have transformed this innate fascination
									into something truly Beautiful.
								</p>
								<Button color="orange" size="big" as="a" href="/gallery">
									View Gallery
								</Button>
								<Header
									inverted
									color="blue"
									as="h3"
									style={{ fontSize: '2em' }}
								>
									Full Stack Web Developer
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									Why is it so difficult to find something to write for this
									section? I hate talking about myself.
								</p>
								<Button color="blue" size="big" as="a" href="/projects">
									View Projects
								</Button>
							</Grid.Column>
							<Grid.Column floated="right" width={6}>
								<Popup
									content="it me"
									position="bottom center"
									trigger={
										<Image
											bordered
											circular
											alt="about_photo"
											src="/bin/about_photo_lg.jpeg"
										/>
									}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
				<Segment style={{ padding: '0em' }} vertical>
					<Grid celled="internally" columns="equal" stackable>
						<Grid.Row textAlign="center">
							<Grid.Column
								color="blue"
								style={{ paddingBottom: '5em', paddingTop: '5em' }}
							>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Gaming Connections
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									That is what they all say about us
								</p>
							</Grid.Column>
							<Grid.Column
								color="green"
								style={{ paddingBottom: '5em', paddingTop: '5em' }}
							>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Spotify Connections
								</Header>
								<p style={{ fontSize: '1.33em' }}>Spotify</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
				<Segment style={{ padding: '8em 0em' }}>
					<Container text>
						<Header as="h3" style={{ fontSize: '2em' }}>
							CV
						</Header>
						<List bulleted style={{ fontSize: '1.33em' }}>
							<List.Item>
								Freelance Software Developer and Web Developer
							</List.Item>
							<Label>2019 - Present</Label>
							<List.Item>
								Computer Repair Technician for Anglia Computer Solutions
							</List.Item>
							<Label>2018 - 2019</Label>
							<List.Item>
								Customer Service Representative for Maplin Electronics
							</List.Item>
							<Label>2015 - 2018</Label>
						</List>
						<Button as="a" size="large">
							Read More
						</Button>
						<Divider
							as="h4"
							className="header"
							horizontal
							style={{ margin: '3em 0em', textTransform: 'uppercase' }}
						>
							<a href="#">Case Studies</a>
						</Divider>
						Article Flow goes here
					</Container>
				</Segment>
			</DefaultLayout>
		</div>
	);
}
