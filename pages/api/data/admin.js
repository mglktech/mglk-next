import os from 'os';

export default async function handler(req, res) {
	const osData = {
		totalMem: os.totalmem(),
		freeMem: os.freemem(),
		arch: os.arch(),
		cpus: os.cpus(),
		hostName: os.hostname(),
		platform: os.platform(),
		type: os.type(),
		uptime: os.uptime(),
	};
	res.status(200).send(osData);
	return;
}
