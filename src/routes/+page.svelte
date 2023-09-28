<script lang="ts">
	import ModCard from '$lib/ModCard.svelte';
	import { fetchIndex } from '$lib';

	const req = fetchIndex();
</script>

<main class="flex flex-col items-center">
	<header class="pt-10 text-center">
		<h1 class="text-5xl font-medium">Geode Mod Index</h1>
		<h2>Browse through all the mods in the Geode index, on the web!</h2>
	</header>
	<section class="my-4">
		<input type="text" placeholder="Search for a mod" class="rounded-md px-4 py-2 shadow-md" />
	</section>
	{#await req}
		<img src="/spinner.svg" alt="spinner" />
	{:then mods}
		<section class="flex flex-col gap-4">
			{#each mods as mod (mod.id)}
				<ModCard data={mod} />
			{/each}
		</section>
	{/await}
</main>
