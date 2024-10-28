<script lang="ts">
	import { goto } from '$app/navigation';
	import { testCreateDoc } from '$lib/db';
	import { logger } from '$lib/observability';
	const console = logger('norad page');

	const { data } = $props();

	console.log({ propsData: data });

	const { account } = data;

	const goToAdmin = () => {
		goto('/norad/admin');
	};

	const testDb = async () => {
		await testCreateDoc();
	};
</script>

<button onclick={testDb}>Test db</button>

<button disabled={!account} onclick={goToAdmin}>Admin</button>
<!-- <button onclick={goToSurvivor}>Survivor</button> -->
