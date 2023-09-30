<script lang="ts">
	import ModCard from '$lib/ModCard.svelte';
	import { fetchIndex } from '$lib';
	import { base } from '$app/paths';
	import Fuse from 'fuse.js';
	import type { ModData } from '$lib/types';
	import { onMount } from 'svelte';
	import debounce from 'lodash.debounce';

	const req = fetchIndex();
	let mods = [] as ModData[];
	let filtered = [] as ModData[];
	let fuse: Fuse<ModData> | undefined;
	let input = '';
	const updateSearch = debounce(() => {
		if (fuse) {
			filtered = input ? fuse.search(input).map((x) => mods[x.refIndex]) : mods;
		}
	}, 100);

	onMount(() => {
		req.then((data) => {
			filtered = mods = data;
			fuse = new Fuse(data, {
				keys: ['name', 'description', 'id']
			});
			updateSearch();
		});
	});
</script>

<main class="flex flex-col items-center pb-6">
	<header class="pt-10 text-center">
		<h1 class="text-5xl font-medium">Geode Mod Index</h1>
		<h2>Browse through all the mods in the Geode index, on the web!</h2>
	</header>
	<section class="my-4">
		<input
			type="text"
			placeholder="Search for a mod"
			class="rounded-md px-4 py-2 shadow-md"
			bind:value={input}
			on:input={updateSearch}
		/>
	</section>
	{#await req}
		<img src="{base}/spinner.svg" alt="spinner" />
	{:then}
		<section class="flex flex-col gap-4 xl:w-1/3">
			{#each filtered as mod (mod.id)}
				<ModCard data={mod} />
			{/each}
		</section>
	{:catch}
		<p class="text-lg font-medium text-red-700">Error fetching the index! Sorry</p>
	{/await}
</main>
