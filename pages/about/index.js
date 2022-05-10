import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ComingSoon } from '../../components/base';
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
				<Grid container stackable verticalAlign="middle">
					<Grid.Row>
						<Grid.Column className="text-center  text-4xl" width={8}>
							<Header inverted>{`Hello,`}</Header>
							<Header inverted>{`I'm Michael.`}</Header>
						</Grid.Column>
						<Grid.Column floated="right" width={8}>
							<Image
								bordered
								circular
								alt="about_photo"
								src="/bin/about_photo_lg.jpeg"
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16}>
							<Header
								inverted
								color="orange"
								as="h3"
								style={{ fontSize: '2em' }}
							>
								Professional Fire Performer
							</Header>
							<p style={{ fontSize: '1.33em' }}>
								Michael started his career in Fire Performing at the age of 16,
								training with other young professionals through the Cambridge
								University Fire Troupe. After learning the essentials and
								gaining experience through Live Performances, he decided to
								pursue his passion and create an independant business.
							</p>
							{`SOME KIND OF GALLERY MODULE`}

							<Header inverted color="blue" as="h3" style={{ fontSize: '2em' }}>
								Full Stack Web Developer
							</Header>
							<p style={{ fontSize: '1.33em' }}>
								{`Frontend, Backend, and Database, I created this site to act as a
								host for my portfolio, and to showcase my skills.`}
							</p>
							<p style={{ fontSize: '1.33em' }}>
								{`mglk.tech also works as a secure access portal to handle client access to my services.`}
							</p>

							<Segment
								inverted
								basic
								style={{
									padding: '4em 0em',
								}}
							>
								<Container text>
									<Divider
										inverted
										as="h4"
										className="header"
										horizontal
										style={{ margin: '3em 0em', textTransform: 'uppercase' }}
									>
										<a href="#">Abilities</a>
									</Divider>
									<List inverted style={{ fontSize: '1.33em' }}>
										<List.Item>
											<List.Icon name="code"></List.Icon>
											<List.Content>
												<List.Header>Ambitious Web Developer</List.Header>
												<List.Description>
													Self-Motivated, Self-Driven, 10+ Years of Experience
													working with HTML, CSS, JS, React, Node, Express,
													MongoDB, MySQL, and more.
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
													Specialist in PC Hardware, Networking, and IT Support.
													Also proficient with{' '}
													<b>Internet of Things (IoT)450</b> devices.
												</List.Description>
											</List.Content>
										</List.Item>
									</List>
								</Container>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</DefaultLayout>
	);
};

export default Index;
