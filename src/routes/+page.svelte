<script>
	import ModCard from '$lib/ModCard.svelte';

	const data = [
		{
			logo: 'https://raw.githubusercontent.com/geode-sdk/mods/main/mods-v2/alk.editorcollab/logo.png',
			name: 'Editor Collab',
			description: 'Live multiplayer editor collaboration tool',
			id: 'alk.editorcollab'
		},
		{
			logo: 'https://raw.githubusercontent.com/geode-sdk/mods/main/mods-v2/geode.devtools/logo.png',
			name: 'Devtools',
			description: 'Epic devtools',
			id: 'geode.devtools'
		},
		{
			logo: 'https://raw.githubusercontent.com/geode-sdk/mods/main/mods-v2/mat.fps-bypass/logo.png',
			name: 'FPS Bypass',
			description: 'fps bpyas',
			id: 'mat.fps-bypass'
		}
	];
</script>

<main class="flex flex-col items-center">
	<header class="pt-10 text-center">
		<h1 class="text-5xl font-medium">Geode Mod Index</h1>
		<h2>Browse through all the mods in the Geode index, on the web!</h2>
	</header>
	<section class="my-4">
		<input type="text" placeholder="Search for a mod" class="rounded-md px-4 py-2 shadow-md" />
	</section>
	<section class="flex flex-wrap gap-4">
		{#each data as mod (mod.id)}
			<ModCard data={mod} />
		{/each}
	</section>
</main>
