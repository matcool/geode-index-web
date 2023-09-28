<script lang="ts">
	import type { ModData } from './types';
	export let data: ModData;
</script>

<article class="flex-1 cursor-pointer rounded-md bg-white p-4 shadow-md hover:bg-gray-50">
	<figure class="flex">
		<img src={data.logo} alt="mod icon for {data.name}" class="aspect-square w-16 overflow-clip" />
		<h1 class="text-xl font-bold">{data.name}</h1>
	</figure>
	<section>{data.description}</section>
</article>
