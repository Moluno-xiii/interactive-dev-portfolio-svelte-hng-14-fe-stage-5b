<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import SkillsGrid from '$lib/components/SkillsGrid.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import { profile } from '$lib/data/profile';
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
