import { DefaultLayout } from '../../../layouts/DefaultLayout';
import { ComingSoon } from '../../../components/base';
/*
Prefetch page with matching [url] from API

API data should contain:
Full Name
Profile Picture
Bio
CV Data
Social Links

This data should be modifyable by the user via the Account Settings page.

The profile itself can only be made public by a site administrator account
The profile's [url] can only be set by the site administrator account and must be unique
 
Later on:
- Add a "Contact" section to contact this specific user

if(url) {
	display.
}
else {
	display not found / 404
}
*/
const Index = () => {
	return (
		<DefaultLayout>
			<ComingSoon />
		</DefaultLayout>
	);
};

export default Index;
