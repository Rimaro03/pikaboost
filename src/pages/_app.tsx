import type { AppProps } from 'next/app';
import { CookiesProvider, useCookies } from 'react-cookie';
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, PaletteMode } from '@mui/material';
import { PublicUser } from 'spotify-types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface userContext {
	userData: PublicUser | undefined,
	setUserData: Dispatch<SetStateAction<PublicUser | undefined>>
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const UserContext = createContext<userContext>({userData: undefined, setUserData: ()=>{} });

const getThemeOptions = (mode: PaletteMode) => ({
	palette: {
		mode: mode,
		primary: {
			main: '#2C63C8',
		},
		secondary: {
			main: '#fff',
		},
		error: {
			main: '#d32f2f',
		},
		warning: {
			main: '#ed6c02',
		},
		info: {
			main: '#0288d1',
		},
		success: {
			main: '#2e7d32',
		}
	},
	typography: {
		fontFamily: 'PlusJakartaSans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Cantarell,Helvetica Neue,Ubuntu,sans-serif',
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
					backgroundColor: '-moz-initial',
				},
			}
		}
	}
});

export default function App({ Component, pageProps }: AppProps) {
	const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
	const [userData, setUserData] = useState<PublicUser>();
	const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
	const [loading, setLoading] = useState(true);

	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);

	const newTheme = React.useMemo(
		() =>
			createTheme(getThemeOptions(mode)),
		[mode],
	);

	useEffect(()=>{
		fetch('http://localhost:3000/api/me/userData', {headers: {'access_token': cookies.access_token}})
			.then(res => {
				if(res.ok){
					return res.json();
				}
				throw res;
			})
			.then(data => setUserData(data))
			.catch(err => console.log(err))
			.finally(()=>{setLoading(false);});
	}, []);

	return (
		<CookiesProvider>
			{!loading ? 
				<ColorModeContext.Provider value={colorMode}>
					<UserContext.Provider value={{userData: userData, setUserData: setUserData}}>
						<ThemeProvider theme={newTheme}>
							<CssBaseline />
							<Component {...pageProps} />
						</ThemeProvider>
					</UserContext.Provider>
				</ColorModeContext.Provider>
				:
				<></>
			}
		</CookiesProvider>
	);
}
