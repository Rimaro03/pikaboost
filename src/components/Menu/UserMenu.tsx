import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';

export default function UserMenu(){
	const [cookie, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);
	const router = useRouter();

	const handleLogout = () => {
		removeCookie('access_token');
		removeCookie('refresh_token');
		router.push('/login');
	};

	return(
		<MenuList>
			<MenuItem>
				<ListItemIcon>
					<AccountCircle fontSize="small" />
				</ListItemIcon>
				<ListItemText>Account</ListItemText>
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<Settings fontSize="small" />
				</ListItemIcon>
				<ListItemText>Settings</ListItemText>
			</MenuItem>
			<MenuItem onClick={handleLogout}>
				<ListItemIcon>
					<Logout fontSize="small" />
				</ListItemIcon>
				<ListItemText>Logout</ListItemText>
			</MenuItem>
		</MenuList>
	);
}