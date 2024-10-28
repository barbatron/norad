<script lang="ts">
	import { goto } from '$app/navigation';
	import { logger } from '$lib/observability';
	const console = logger('norad page');

	const { data } = $props();

	console.log({ propsData: data });

	const { account } = data;

	const goToAdmin = () => {
		goto('/norad/admin');
	};
</script>

<button disabled={!account} onclick={goToAdmin}>Admin</button>
<!-- <button onclick={goToSurvivor}>Survivor</button> -->
