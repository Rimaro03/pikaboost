import type { NextApiRequest, NextApiResponse } from 'next';
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();

type Data = {
    name: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

	// requesting access token from refresh token
	const refresh_token = req.query.refresh_token;
	const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
		form: {
			grant_type: 'refresh_token',
			refresh_token: 'AQCvmXYJWDmLsF7qEIOb3r3F_K5wr6r2CSn3CYWfBNev618zi2Pn5eiQeu1eVSQJ9UtfwLinbX9XcvU9cssUOAAWvdNrZ1k6CImHAezPfMM0CORrNJZTKvvoVCUkz82K4U0'
		},
		json: true
	};
      
	request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			const access_token = body.access_token;
			res.send({
				'access_token': access_token
			});
		}
		res.send('ERROR');
	});
}