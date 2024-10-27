<script lang="ts">
	import { goto } from '$app/navigation';

	const { data } = $props();

	console.log('[page: /norad]', { propsData: data });

	const { account } = data;

	const goToAdmin = () => {
		goto('/norad/admin');
	};
</script>

<button disabled={!account} onclick={goToAdmin}>Admin</button>
<!-- <button onclick={goToSurvivor}>Survivor</button> -->
