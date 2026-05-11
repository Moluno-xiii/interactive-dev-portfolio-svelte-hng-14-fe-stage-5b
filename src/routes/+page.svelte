<script lang="ts">
	import { onMount } from 'svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import SkillsGrid from '$lib/components/SkillsGrid.svelte';
	import { profile } from '$lib/data/profile';
	import { activeSection } from '$lib/stores/activeSection.svelte';

	onMount(() => {
		activeSection.init(['hero', 'about', 'work', 'stack', 'contact']);
		return () => activeSection.destroy();
	});
</script>

<svelte:head>
	<title>{profile.name} — {profile.title}</title>
	<meta name="description" content={profile.tagline} />
</svelte:head>

<Hero />
<About />
<ProjectGrid />
<SkillsGrid />
<Contact />
