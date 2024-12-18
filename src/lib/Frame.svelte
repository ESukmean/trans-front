<script>
	import GNB from './GNB.svelte';
	import Footer from './Footer.svelte';
	const { children } = $props();
</script>

<GNB></GNB>
{@render children()}
<Footer></Footer>
