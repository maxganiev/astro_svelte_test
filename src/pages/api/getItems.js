import { promisedPool } from '../../dbConfig';

export async function get() {
	//as long as you don't have access to my db, any api can be referred, like:
	const user = await new Promise(async (res, rej) => {
		const request = await fetch('https://randomuser.me/api');
		const response = await request.json();

		if (response) res(response);
		else rej(new Error('connection failed'));
	});

	return {
		body: JSON.stringify(user),
	};

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

	return {
		body: JSON.stringify(result),
	};
}
