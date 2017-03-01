import fs from 'fs';
import path from 'path';
import test from 'ava';
import webpack from 'webpack';
import rimraf from 'rimraf';

import loader from '../index';

test.serial('basic usage', async t => {
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

const noop = () => {};

test('not cacheable by default', t => {
	t.plan(3);

	loader.call({
		exec: noop,
		cacheable: c => t.false(c)
	});

	loader.call({
		exec: noop,
		cacheable: c => t.false(c),
		query: '?foo'
	});

	loader.call({
		exec: noop,
		cacheable: c => t.false(c),
		query: { foo: true }
	});
});

test('cache option', t => {
	t.plan(5);

	loader.call({
		exec: noop,
		cacheable: c => t.true(c),
		query: '?cache'
	});

	loader.call({
		exec: noop,
		cacheable: c => t.true(c),
		query: '?cache=true'
	});

	loader.call({
		exec: noop,
		cacheable: c => t.false(c),
		query: '?cache=false'
	});

	loader.call({
		exec: noop,
		cacheable: c => t.true(c),
		query: { cache: true }
	});

	loader.call({
		exec: noop,
		cacheable: c => t.false(c),
		query: { cache: false }
	});
});

test.after(t => {
	rimraf.sync(path.join(__dirname, 'dist'));
});
