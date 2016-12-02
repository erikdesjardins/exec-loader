import fs from 'fs';
import path from 'path';
import test from 'ava';
import webpack from 'webpack';
import rimraf from 'rimraf';

test('basic usage', async t => {
	await new Promise((resolve, reject) => {
		webpack({
			entry: path.join(__dirname, 'src/main.js'),
			bail: true,
			output: {
				path: path.join(__dirname, 'dist'),
				filename: 'main.bundle.js'
			},
			module: {
				loaders: [
					{ test: /exec\.js$/, loader: path.join(__dirname, '../index.js') }
				]
			}
		}, (err, stats) => {
			err ? reject(err) : resolve(stats);
		});
	});

	t.regex(fs.readFileSync(path.join(__dirname, 'dist/main.bundle.js')), /module\.exports = "abc";/);
});

test.after(t => {
	rimraf.sync(path.join(__dirname, 'dist'));
});
