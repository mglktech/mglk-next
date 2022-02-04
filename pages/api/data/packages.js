import svPackage from '../../../package.json';
//console.log(svPackage.dependencies);
const GetDependencies = () => {
	return Object.keys(svPackage.dependencies);
};

const FilterAndCut = () => {
	let processes = Object.keys(process.env);
	const phrase = 'npm_package_dependencies_';
	const filteredProcesses = processes.filter((p) => p.includes(phrase));
	return filteredProcesses.map((process) => {
		let dep = process.substring(phrase.length);
		if (dep.indexOf('_') === 0) {
			dep = dep.replace('_', '@');
		}
		dep = dep.replace(/_/g, '-');
		//console.log(dep);
		return dep;
	});
};
// Package is object key starting with npm_package_dependencies_
// Filter packages to only contain the above

const packages = (req, res) => {
	//console.log(FilterAndCut());
	try {
		//res.status(200).json({ error: false, data: FilterAndCut() });
		res.status(200).json({ error: false, data: GetDependencies() });
	} catch (e) {
		res.status(404).json({ error: true, data: [], msg: e });
	}
};
export default packages;
