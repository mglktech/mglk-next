/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import { ResponsiveContainer } from '../components/base';
import {
	DefaultHead,
	DefaultFooter,
	FooterData,
	BasicContainer,
	NavBar,
} from '../components/base';

export const StickyNavLayout = ({ children, title, hero }) => (
	<>
		<DefaultHead title={title} />
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<div style={{ flex: '1 0 auto' }}>
				<ResponsiveContainer hero={hero ? true : false}>
					{children}
				</ResponsiveContainer>
			</div>
			<div style={{ flexShrink: '0' }}>
				<DefaultFooter data={FooterData} />
			</div>
		</div>
	</>
);

export const DefaultLayout = ({ children, title, footer = true }) => (
	<>
		<DefaultHead title={title} />
		<div
			style={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'Column',
			}}
		>
			<NavBar />

			<div style={{ position: 'relative', width: '100%', flex: '1 0 auto' }}>
				{children}
			</div>
			<div style={{ flexShrink: '0' }}>
				{footer ? <DefaultFooter data={FooterData} /> : null}
			</div>
		</div>
	</>
);
