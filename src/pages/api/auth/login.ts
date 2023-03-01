import type { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';
import { serialize } from 'cookie';
import dotenv from 'dotenv';
dotenv.config();
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */


const REDIRECT_URI = 'http://localhost:3000/api/auth/callback';
const STATE_KEY = 'spotify_auth_state';

const generateRandomString = (length: number) => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

type Data = {
	name: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const state = generateRandomString(10);
	const scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private';
	res.setHeader('Set-Cookie', serialize(STATE_KEY, state, {path: '/'}));
	res.redirect('https://accounts.spotify.com/authorize?' +
		stringify({
			response_type: 'code',
			client_id: process.env.CLIENT_ID,
			scope: scopes,
			redirect_uri: REDIRECT_URI,
			state: state
		}));
}