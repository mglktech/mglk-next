import { DefaultLayout } from '../layouts/DefaultLayout';
import { FrontPageHero } from '../components/base';
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
	ListHeader,
} from 'semantic-ui-react';
export default function Home() {
	return (
		<div className="App">
			<DefaultLayout title="mglk.tech">
				<FrontPageHero />

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

								<Header
									inverted
									color="blue"
									as="h3"
									style={{ fontSize: '2em' }}
								>
									Full Stack Web Developer
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									Frontend, Backend, and Database, I created this site to act as
									a host for my portfolio.
								</p>
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

				<Segment style={{ padding: '8em 0em' }}>
					<Container text>
						<Divider
							as="h4"
							className="header"
							horizontal
							style={{ margin: '3em 0em', textTransform: 'uppercase' }}
						>
							<a href="#">Abilities</a>
						</Divider>
						<List style={{ fontSize: '1.33em' }}>
							<List.Item>
								<List.Icon name="code"></List.Icon>
								<List.Content>
									<List.Header>Ambitious Web Developer</List.Header>
									<List.Description>
										Self-Motivated, Self-Driven, 10+ Years of Experience working
										with HTML, CSS, JS, React, Node, Express, MongoDB, MySQL,
										and more.
									</List.Description>
								</List.Content>
							</List.Item>
							<List.Item>
								<List.Icon name="computer"></List.Icon>
								<List.Content>
									<List.Header>
										Experienced Computer Hardware Technician
									</List.Header>
									<List.Description>
										Specialist in PC Hardware, Networking, and IT Support. Also
										proficient with <b>Internet of Things (IoT)450</b> devices.
									</List.Description>
								</List.Content>
							</List.Item>

							<Divider section />
							{/* Split two seperate profession fields using a divider */}

							<List.Item>
								<List.Icon name="fire"></List.Icon>
								<List.Content>
									<List.Header>Professional Fire Performer</List.Header>
									<List.Description>Some kind of description</List.Description>
								</List.Content>
							</List.Item>
						</List>
					</Container>
				</Segment>
			</DefaultLayout>
		</div>
	);
}
