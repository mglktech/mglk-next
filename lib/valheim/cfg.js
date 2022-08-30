const titlePhrase = '## Settings file was created by plugin ';
const guidPhrase = '## Plugin GUID: ';

export const readConfig = async (data, fileName) => {
	const fileLines = readLines(data);
	const matchedTitle = fileLines.filter((e) => e.includes(titlePhrase));
	const matchedGuid = fileLines.filter((e) => e.includes(guidPhrase));
	let category = '';
	let arrayOfSettings = [];
	let arrayOfOptions = [];
	let comments = [];
	let name;
	let val;
	for (let i = 0; i < fileLines.length; i++) {
		//console.log(fileLines[i]);
		const isTitleOrGuid =
			fileLines[i].includes(titlePhrase) || fileLines[i].includes(guidPhrase);
		if (isTitleOrGuid) {
			//console.log('This line is a title or guid');
			continue;
		}
		const isCategory =
			fileLines[i].startsWith('[') && fileLines[i].endsWith(']');
		if (isCategory) {
			// save previous array of options if it exists
			//console.log('line is a category');
			if (arrayOfOptions.length > 0) {
				//console.log('pushing options to settings...');
				arrayOfSettings.push({ category, options: arrayOfOptions });
				arrayOfOptions = [];
			}
			category = fileLines[i].substring(1, fileLines[i].length - 1);
			continue;
		}
		const isComment =
			fileLines[i].startsWith('# ') ||
			fileLines[i].startsWith('## ') ||
			fileLines[i].startsWith('; ');
		if (isComment) {
			//console.log('Line is a Comment, pushing comment...');
			let comment;
			if (fileLines[i].charAt(1) == '#') {
				comment = fileLines[i].substr(2);
			} else {
				comment = fileLines[i].substr(1);
			}

			comments.push(comment.trim());
			continue;
		}
		// if it's none of the above, it has to be a nameval combo
		const nameVal = fileLines[i].split(' = ');
		name = nameVal[0];
		val = nameVal[1];
		//console.log('Line is a nameval? Pushing options and clearing comments...');
		// send it?
		arrayOfOptions.push({
			name,
			value: val,
			description: comments,
		});
		// clear for next round?
		comments = [];
		name = '';
		val = '';
		continue;
	}
	if (arrayOfSettings.length == 0) {
		// if the array of settings is still empty, push existing options instead
		arrayOfSettings.push({ category, options: arrayOfOptions });
	}
	//console.log(`file name is ${fileName}`);
	let fileProp = {
		title: matchedTitle[0]
			? matchedTitle[0].replace(titlePhrase, '')
			: fileName.replace('.cfg', ''),
		guid: matchedGuid[0]
			? matchedGuid[0].replace(guidPhrase, '')
			: fileName.replace('.cfg', ''),
		settings: arrayOfSettings,
		nexusCompatible: matchedTitle[0] && matchedGuid[0] ? true : false,
	};
	//console.dir(fileProp);
	return fileProp;
};

const readLines = (data) => {
	//console.log(data);
	return data
		.split('\r')
		.map((e) => {
			return e.replace('\n', '');
		})
		.filter((e) => {
			return e;
		});
};
