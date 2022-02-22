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
								<Image
									bordered
									circular
									alt="about_photo"
									src="/bin/about_photo_lg.jpeg"
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
				<Segment style={{ padding: '8em 0em' }} vertical>
					<Container text>
						<Header as="h3" style={{ fontSize: '2em' }}>
							Breaking The Grid, Grabs Your Attention
						</Header>
						<p style={{ fontSize: '1.33em' }}>
							Instead of focusing on content creation and hard work, we have
							learned how to master the art of doing nothing by providing
							massive amounts of whitespace and generic content that can seem
							massive, monolithic and worth your attention.
						</p>
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
				<Segment>
					<Header>Page Goals:</Header>
					<List>
						<List.Content>
							<List.Item>
								Find better profile photo more suited to the page design
							</List.Item>
							<List.Item>
								Create better parageraph text in profile section
							</List.Item>
							<List.Item>Link Buttons to sections of the site</List.Item>
							<List.Item>Sort Footer</List.Item>
							<List.Item>Sort Gaming section</List.Item>
							<List.Item>Sort Spotify Section</List.Item>
							<List.Item>
								Decide whether Case Studies is really necessary right now.
							</List.Item>
						</List.Content>
					</List>
				</Segment>
			</DefaultLayout>
		</div>
	);
}
