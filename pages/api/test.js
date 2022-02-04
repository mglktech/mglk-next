let processes = Object.keys(process.env);
const phrase = 'npm_package_dependencies_';
const FilterAndCut = () => {
	// Filters through all ENV processes and finds ones containing phrase
	const filteredProcesses = processes.filter((p) => p.includes(phrase));
	return filteredProcesses.map((process) => {
		return process.substring(phrase.length); // Returns trimmed package names as an array
	});
};
// Package is object key starting with npm_package_dependencies_
// Filter packages to only contain the above

const test = (req, res) => {
	//console.log(FilterAndCut());
	res.status(200).json({ error: false, data: 'ok' });
};

export default test;

// TODO: Create viewer-selector which uses this api to collect current modules
// Must be able to select moduels for display on the front page
// Ability to hide certain modules and not have them displayed
// maybe give each module a Color for a label?
// Maybe have links/refs to npmjs.org and a searched versio of the module.
