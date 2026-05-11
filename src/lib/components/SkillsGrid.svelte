<script lang="ts">
	import { skills } from '$lib/data/skills';
	import SectionHeading from './SectionHeading.svelte';
</script>

<section id="stack" class="section relative border-t border-border" aria-labelledby="stack-title">
	<div class="container-page">
		<SectionHeading
			eyebrow="Stack"
			title="Tools I reach for."
			titleId="stack-title"
			description="A working stack — opinionated, not exhaustive. I trade familiarity for ergonomics when the job calls for it."
		/>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each skills as cat (cat.name)}
				<div
					class="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-border-strong"
				>
					<div class="flex items-center justify-between">
						<h3
							class="m-0 font-display text-lg font-medium tracking-tight text-fg"
							style="font-variation-settings: 'opsz' 24, 'wdth' 95;"
						>
							{cat.name}
						</h3>
						<span class="mono text-[0.65rem] tracking-wider text-muted uppercase">
							{String(cat.items.length).padStart(2, '0')}
						</span>
					</div>
					<ul class="m-0 flex list-none flex-wrap gap-1.5 p-0">
						{#each cat.items as item (item.label)}
							<li class="chip transition-colors duration-200 group-hover:border-border-strong">
								{item.label}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>
