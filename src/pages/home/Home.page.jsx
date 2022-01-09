import { createTheme } from '@mui/material';
import React from 'react';
import { Progress } from '../../components/progress/Progress.component';
import { ScopedTheme } from '../../components/theme/ScopedTheme.component';
import First from './First.page';
import Four from './Four.page';
import Second from './Second.page';
import Third from './Third.page';

const dark = createTheme({ palette: { mode: 'dark' } });
const light = createTheme({ palette: { mode: 'light' } });

function Home() {
	return (
		<>
			<Progress />
			<ScopedTheme theme={dark}>
				<First />
			</ScopedTheme>
			<ScopedTheme theme={light}>
				<Second />
			</ScopedTheme>
			<ScopedTheme theme={light}>
				<Third />
			</ScopedTheme>
			<ScopedTheme theme={dark}>
				<Four />
			</ScopedTheme>
		</>
	);
}

export default Home;
