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
	Message,
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
						<Grid.Column
							className="text-center text-4xl tracking-wide"
							width={8}
						>
							<Header inverted>{`Hello,`}</Header>
							<Header inverted>
								{`I'm`}{' '}
								<b className="bg-white text-black font-mono text-5xl">
									Michael
								</b>
							</Header>
							<span className="text-2xl">
								Welcome to{' '}
								<b className="bg-white text-black font-mono text-3xl">
									My Domain.
								</b>
							</span>
						</Grid.Column>
						<Grid.Column floated="right" width={8}>
							<Image
								bordered
								circular
								alt="about_photo"
								src="/bin/about_photo_lg_unflip_bw.jpeg"
								className="p-5"
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row columns={1}>
						<Grid.Column className="py-10">
							<Message
								color="black"
								size="massive"
								className="tracking-wide text-center"
							>
								I Created This Space to help me{' '}
								<b className="bg-white text-black font-mono ">Learn</b>
								{` `}and Showcase My Experience in{' '}
								<b className="bg-white text-black font-mono ">
									Web Development
								</b>
								<br /> <br />
								<Message.Header className="py-6">
									I am a{' '}
									<b className="bg-white text-black font-mono text-4xl">
										Maker
									</b>
								</Message.Header>
								I <b className="bg-white text-black font-mono text-3xl">Like</b>
								{` `}to Invent.
							</Message>
						</Grid.Column>
						<Grid.Column className="py-20">
							<Message
								color="black"
								size="huge"
								className="teacking-wide text-center"
							></Message>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row stretched columns={2}>
						<Grid.Column color="blue">
							<List inverted>
								<List.Item>
									<List.Icon name="code" size="huge"></List.Icon>
									<List.Content>
										<List.Header as="h2">Ambitious Web Developer</List.Header>
										<List.Description>
											Self-Motivated, Self-Driven, 10+ Years of Experience
											working with HTML, CSS, JS, React, Node, Express, MongoDB,
											MySQL, and more.
										</List.Description>
									</List.Content>
								</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column color="orange">
							<List inverted>
								<List.Item>
									<List.Icon name="fire" size="huge"></List.Icon>
									<List.Content>
										<List.Header as="h2">
											Professional Fire Performer
										</List.Header>
										<List.Description>
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
						<Grid.Column width={16} color="violet">
							<List inverted>
								<List.Item>
									<List.Icon name="computer" size="huge"></List.Icon>
									<List.Content>
										<List.Header as="h2">
											Experienced Computer Hardware Technician
										</List.Header>
										<List.Description>
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
