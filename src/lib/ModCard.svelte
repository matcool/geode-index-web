<script lang="ts">
	import type { ModData } from './types';
	export let data: ModData;
</script>

<article class="cursor-pointer rounded-md bg-white p-4 shadow-md hover:bg-gray-50">
	<figure class="flex align-top">
		<img
			src={data.logo}
			alt="mod icon for {data.name}"
			class="aspect-square w-16 overflow-clip object-contain"
		/>
		<div class="ml-2 flex flex-col">
			<h1 class="text-xl font-bold">{data.name}</h1>
			<h3>{data.description}</h3>
		</div>
	</figure>
</article>
