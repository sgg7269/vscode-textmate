var fs = require('fs');
var path = require('path');

var OUT_FOLDER = path.join(__dirname, '../out');
var RELEASE_FOLDER = path.join(__dirname, '../release');

var sources = [
	'utils.js',
	'matcher.js',
	'grammarReader.js',
	'rule.js',
	'grammar.js',
	'registry.js',
	'main.js'
].map(function(sourceFile) {
	var name = './' + sourceFile.replace(/\.js$/, '');
	var sourcePath = path.join(OUT_FOLDER, sourceFile);
	var sourceContents = fs.readFileSync(sourcePath).toString();

	return [
		"$load('" + name + "', function(require, module, exports) {",
		sourceContents,
		"});"
	].join('\n');
});

var all = [];
all.push(fs.readFileSync(path.join(OUT_FOLDER, '_prefix.js')).toString());
all = all.concat(sources);
all.push(fs.readFileSync(path.join(OUT_FOLDER, '_suffix.js')).toString());

fs.writeFileSync(path.join(RELEASE_FOLDER, 'main.js'), all.join('\n'));
fs.writeFileSync(path.join(RELEASE_FOLDER, 'main.d.ts'), fs.readFileSync(path.join(OUT_FOLDER, 'main.d.ts')));