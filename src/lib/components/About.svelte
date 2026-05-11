<script lang="ts">
	import { profile } from '$lib/data/profile';
	import SectionHeading from './SectionHeading.svelte';

	const nowIcons: Record<string, string> = {
		Building: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
		Reading: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
		Listening:
			'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
		Learning: 'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c0 1 4 3 6 3s6-2 6-3v-5'
	};
</script>

<section id="about" class="section relative" aria-labelledby="about-title">
	<div class="container-page">
		<SectionHeading
			eyebrow="About"
			title="A frontend engineer who treats interaction like a material."
			titleId="about-title"
			description={profile.bio}
		/>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-[1.6fr_1fr] md:gap-8">
			<!-- Long-form bio: split into paragraphs for breathing room -->
			<div class="flex flex-col gap-5 text-[clamp(1.05rem,1.2vw,1.15rem)] leading-[1.6] text-soft">
				<p class="m-0">
					I trained as a self-taught engineer and have spent the last five years shipping interfaces
					that range from data-heavy dashboards to small, sharp consumer tools. I keep coming back
					to three problems: how things move, how things feel under your hand, and how to make all
					of that fast.
				</p>
				<p class="m-0">
					Outside work I'm usually pulling apart someone else's website to figure out how they did
					it, or hacking on terminal tooling in Rust. I write occasional notes on motion and
					performance.
				</p>
				<div class="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem] text-muted">
					<span class="inline-flex items-center gap-1.5">
						<svg
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.7"
							aria-hidden="true"
						>
							<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle
								cx="12"
								cy="10"
								r="3"
							/>
						</svg>
						{profile.location}
					</span>
					<span class="inline-flex items-center gap-1.5">
						<svg
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.7"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
						</svg>
						{profile.timezone}
					</span>
					<span class="inline-flex items-center gap-1.5 text-accent">
						<span class="live-dot" aria-hidden="true"></span>
						Open to work
					</span>
				</div>
			</div>

			<!-- Now panel — the standout "currently" block -->
			<aside class="rounded-2xl border border-border bg-surface p-1.5">
				<div class="flex items-center justify-between rounded-xl bg-surface-2 px-4 py-3">
					<span class="mono text-[0.7rem] tracking-wider text-muted uppercase">Currently</span>
					<span
						class="inline-flex items-center gap-1.5 mono text-[0.7rem] tracking-wider text-accent uppercase"
					>
						<span class="live-dot" aria-hidden="true"></span>
						Live
					</span>
				</div>
				<ul class="m-0 flex list-none flex-col gap-0 p-0">
					{#each profile.now as entry, i (entry.label)}
						<li
							class="group flex items-start gap-3 px-4 py-3.5 transition-colors duration-200 hover:bg-surface-2"
							class:border-t={i > 0}
							class:border-border={i > 0}
						>
							<span
								class="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-accent transition-colors duration-200 group-hover:border-accent"
								aria-hidden="true"
							>
								<svg
									width="13"
									height="13"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.8"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d={nowIcons[entry.label] ?? 'M12 2v20M2 12h20'} />
								</svg>
							</span>
							<div class="flex min-w-0 flex-1 flex-col">
								<span class="mono text-[0.65rem] tracking-wider text-muted uppercase">
									{entry.label}
								</span>
								<span class="truncate text-[0.95rem] font-medium text-fg">{entry.value}</span>
								{#if entry.meta}
									<span class="truncate text-[0.82rem] text-muted">{entry.meta}</span>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			</aside>
		</div>
	</div>
</section>
