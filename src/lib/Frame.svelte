<script>
	import GNB from './GNB.svelte'
	const { children } = $props();
</script>

<GNB />
{@render children()}
