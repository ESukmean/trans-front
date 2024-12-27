<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>GPTTrans</title>
</svelte:head>

{@render children()}
