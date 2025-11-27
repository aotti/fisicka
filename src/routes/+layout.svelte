<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	
	let { children } = $props();
</script>

<svelte:head>
    <title> Fisicka </title>
    <link rel="shortcut icon" href={favicon} type="image/x-icon">
</svelte:head>

{@render children()}
