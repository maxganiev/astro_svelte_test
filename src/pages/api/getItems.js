import { promisedPool } from '../../dbConfig';
import fetch from 'node-fetch';

export async function get() {
	try {
		const user = await new Promise(async (res, rej) => {
			const request = await fetch('https://randomuser.me/api');
			const response = await request.json();

			if (response) res(response);
			else rej(new Error('connection failed'));
		});

		// const request = await fetch('https://randomuser.me/api');
		// const response = await request.json();
		// console.log(response);

		return new Response(JSON.stringify(user), {
			status: 200,
		});

		const categories = await new Promise(async (res, rej) => {
			const [rows] = await promisedPool.query('SELECT * FROM oc_category WHERE parent_id = 458 AND status = 1 AND image != ""');

			if (rows) res(rows);
			else rej(new Error('db error'));
		});

		//console.log(categories);

		const ids = categories.map((item) => item.category_id);

		//console.log(ids);

		const catNames = await new Promise(async (res, rej) => {
			const [rows] = await promisedPool.query(
				`SELECT name, category_id FROM oc_category_description WHERE category_id in (${ids.join(',')})`
			);

			if (rows) res(rows);
			else rej(new Error('db error'));
		});

		const result = categories.map((item) => {
			const catName = catNames.find((_item) => _item.category_id == item.category_id);

			return { ...item, name: catName.name };
		});

		//console.log(result);

		if (!result) {
			return new Response(null, {
				status: 404,
				statusText: 'Problem has occured',
			});
		}

		return new Response(JSON.stringify(result), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
	}
}
