import path from 'path';
import { promises as fs } from 'fs';
import dbConnect from '../../../lib/dbConnect';
import valheimPluginModel from '../../../models/ValheimPlugin';
import { readConfig } from '../../../lib/valheim/cfg';
import { getSession } from 'next-auth/react';

// makes model, library and database accessible for cfgReader
export default async function handler(req, res) {
	const session = await getSession({ req });
	if (!session.user) {
		res.status(500).json({ err: 'No User' });
		return;
	}

	//console.log(bodyConfig);
	const uploadedBy = session.user._id;
	const {
		query: { f, _id, name, params },
		method,
	} = req;

	await dbConnect();
	switch (method) {
		case 'GET':
			// if _id is provided, perform search by ID and ensure uploader matches session user
			if (params) {
				res
					.status(200)
					.json(await valheimPluginModel.findOne({ uploadedBy, ...params }));
				return;
			}
			if (_id) {
				res
					.status(200)
					.json(await valheimPluginModel.findOne({ uploadedBy, _id }));
				return;
			}
			// otherwise, pull an index of titles and guids.
			res
				.status(200)
				.json(
					await valheimPluginModel.find(
						{ uploadedBy },
						'title guid nexusCompatible'
					)
				);
			return;
		case 'POST':
			const bodyConfig = await readConfig(req.body, name);
			if (!bodyConfig) {
				res.status(500).json({ err: 'Conversion Error' });
				return;
			}
			const pluginExists = await valheimPluginModel.findOne({
				uploadedBy,
				guid: bodyConfig.guid,
			});
			if (f === 'readOnly') {
				const exists = pluginExists ? true : false;
				res.status(200).json({ exists, data: bodyConfig });
				return;
			}
			const plugin = new valheimPluginModel({ ...bodyConfig, uploadedBy });
			if (!plugin) {
				res.status(500).json({ err: 'Plugin Model conversion error' });
				return;
			}

			// otherwise, perform Save

			if (pluginExists) {
				const r = await valheimPluginModel
					.findByIdAndUpdate(pluginExists._id, bodyConfig)
					.exec();
				res.status(200).json({ data: r });
				return;
			}
			plugin.save();
			res.status(200).json({ data: plugin });
			return;
		case 'DELETE':
			if (!_id) return;
			res
				.status(200)
				.json(await valheimPluginModel.findOneAndDelete({ uploadedBy, _id }));
			return;

		// case 'PUT':
		// 	const config = await readConfig(req.body);
		// 	console.log(config);
		// 	const resp = await valheimPluginModel.findOneAndUpdate(
		// 		{ uploadedBy, guid: config.guid },
		// 		config
		// 	);
		// 	res.status(200).json(resp);
		// 	return;
	}
}
