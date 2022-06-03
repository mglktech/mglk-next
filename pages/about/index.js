import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ComingSoon } from '../../components/base';
import Gallery from '../../components/Gallery';
import {
	Header,
	Textbox,
	Button,
	Card,
	Container,
	Image,
	Icon,
	Grid,
	Rail,
	Segment,
	List,
	Label,
	Input,
	Form,
	Placeholder,
	Table,
	Dropdown,
	Select,
	Modal,
	Divider,
} from 'semantic-ui-react';
/*
ABOUT ALL

Splitscreen this page into two sections:
- List of Publically available user profiles
- About Site
*/

const Index = () => {
	return (
		<DefaultLayout>
			<Segment inverted vertical style={{ padding: '5em 0em' }}>
				<Grid container stackable>
					<Grid.Row verticalAlign="middle">
						<Grid.Column className="text-center  text-4xl" width={8}>
							<Header inverted>{`Hello,`}</Header>
							<Header inverted>{`I'm Michael.`}</Header>
							<span className="text-xl">{`Welcome To My Website`}</span>
						</Grid.Column>
						<Grid.Column floated="right" width={8}>
							<Image
								bordered
								circular
								alt="about_photo"
								src="/bin/about_photo_lg_unflip_bw.jpeg"
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row columns={1}>
						<Grid.Column>
							<Segment inverted style={{ padding: '5em', textAlign: 'center' }}>
								<Header
									inverted
									color="blue"
									as="h2"
									style={{ fontSize: '2em' }}
								>
									I Wanted Somewhere To Put Things...
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									{`mglk.tech is a website that I created to help me learn and grow
								as a developer.`}
								</p>
								<p style={{ fontSize: '1.33em' }}>
									{`I'm a software engineer with a passion for learning and building
								new things.`}
								</p>
							</Segment>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row stretched columns={2}>
						<Grid.Column style={{ padding: '5em' }} color="blue">
							<List inverted>
								<List.Item>
									<List.Icon name="code" size="huge"></List.Icon>
									<List.Content>
										<List.Header as="h2">Ambitious Web Developer</List.Header>
										<List.Description style={{ fontSize: '1.33em' }}>
											Self-Motivated, Self-Driven, 10+ Years of Experience
											working with HTML, CSS, JS, React, Node, Express, MongoDB,
											MySQL, and more.
										</List.Description>
									</List.Content>
								</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column style={{ padding: '5em' }} color="orange">
							<List inverted>
								<List.Item>
									<List.Icon name="fire" size="huge"></List.Icon>
									<List.Content>
										<List.Header as="h2">
											Professional Fire Performer
										</List.Header>
										<List.Description style={{ fontSize: '1.23em' }}>
											I have Always been Mesmerised by the Power of Fire, Ever
											since I was Young. This Intense Passion for Heat and Flame
											has led to me performing in a Diverse assortment of
											Venues. Everything from Nuanced little Get-Togethers to
											Large Scale Events.
										</List.Description>
									</List.Content>
								</List.Item>
							</List>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column style={{ padding: '5em' }} width={16} color="violet">
							<List inverted>
								<List.Item>
									<List.Icon name="computer" size="huge"></List.Icon>
									<List.Content>
										<List.Header as="h2">
											Experienced Computer Hardware Technician
										</List.Header>
										<List.Description style={{ fontSize: '1.33em' }}>
											Specialist in PC Hardware, Networking, and IT Support.
											Also proficient with <b>Internet of Things (IoT)450</b>{' '}
											devices.
										</List.Description>
									</List.Content>
								</List.Item>
							</List>
						</Grid.Column>
					</Grid.Row>
					<Divider />
					<Grid.Row>
						<Grid.Column width={16}>
							<Segment basic vertical>
								<Header inverted as="h3">
									Some photos from my Google Album
								</Header>

								<Gallery />
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</DefaultLayout>
	);
};

export default Index;
