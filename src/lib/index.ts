import type { ModData } from '$lib/types';
import { BlobReader, ZipReader, TextWriter, type Entry, Data64URIWriter } from '@zip.js/zip.js';
import { dev } from '$app/environment';

async function entryToJson(entry: Entry): Promise<any> {
	const writer = new TextWriter();
	return JSON.parse(await entry.getData!(writer));
}

export async function fetchIndex() {
	const req = await fetch(
		dev
			? '/geode-sdk-mods.zip'
			: 'https://corsproxy.io/?' +
					encodeURI('https://codeload.github.com/geode-sdk/mods/legacy.zip/refs/heads/main')
	);
	const bytes = await req.blob();

	const zipFileReader = new BlobReader(bytes);
	const zipFile = new ZipReader(zipFileReader);

	const mods = [] as ModData[];

	const modEntries: { [x: string]: Entry } = {};
	let configFile;

	for await (const entry of zipFile.getEntriesGenerator()) {
		if (entry.filename.includes('/config.json')) {
			configFile = await entryToJson(entry);
			continue;
		}

		const match = entry.filename.match(/[\w\-.]+?\/mods-v2\/([\w\-.]+?)\/(.+)/);
		if (match == null) continue;
		const modId = match[1];
		const path = match[2];
		modEntries[`${modId}/${path}`] = entry;
	}

	if (configFile) {
		for (const id of Object.keys(configFile.entries)) {
			const latestVersion: string = configFile.entries[id].versions.at(-1);
			const modInfoObj = await entryToJson(modEntries[`${id}/${latestVersion}/mod.json`]);

			let logoUrl;
			if (modEntries[`${id}/logo.png`]) {
				const writer = new Data64URIWriter();
				logoUrl = await modEntries[`${id}/logo.png`].getData!(writer);
			}
			mods.push({
				id,
				name: modInfoObj.name,
				logo: logoUrl ?? 'https://raw.githubusercontent.com/geode-sdk/example-mod/main/logo.png',
				description: modInfoObj.description
			});
		}
	}

	await zipFile.close();

	return mods;
}
