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
	const authOptions = {
		url: `https://api.spotify.com/v1/me/playlists?limit=${req.query.limit}`,
		headers: { 'Authorization': 'Bearer ' + req.headers.access_token},
		json: true
	};

	request.get(authOptions, function(error, response, body) {
		res.statusCode = response.statusCode;		
		if (!error && response.statusCode === 200) {
			console.log(req);
			res.send(body);
		}
		res.send(error);
	});
}