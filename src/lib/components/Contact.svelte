<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { profile } from '$lib/data/profile';
	import SocialLinks from './SocialLinks.svelte';

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | null = null;

	let name = $state('');
	let email = $state('');
	let message = $state('');

	function copyEmail() {
		navigator.clipboard?.writeText(profile.email).then(() => {
			copied = true;
			if (copyTimer) clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 1800);
		});
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const subject = encodeURIComponent(`Hi from ${name || 'a visitor'}`);
		const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
		window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
	}
</script>

<section
	id="contact"
	class="section relative border-t border-border"
	aria-labelledby="contact-title"
>
	<div class="container-page" use:reveal>
		<div class="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr] md:gap-12">
			<div class="flex flex-col gap-6">
				<span class="inline-flex items-center gap-2 eyebrow text-accent">
					<span class="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true"></span>
					Get in touch
				</span>
				<h2 id="contact-title" class="m-0 max-w-[18ch] text-display text-fg">
					Let's build something good.
				</h2>
				<p class="m-0 max-w-[44ch] text-[clamp(1.05rem,1.3vw,1.15rem)] leading-[1.55] text-soft">
					Open to product work, collaborations, and the occasional bit of mischief. The fastest way
					to reach me is email — I read everything within 48 hours.
				</p>

				<div class="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
					<a class="btn btn-primary" href="mailto:{profile.email}">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							<rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
						</svg>
						Send email
					</a>
					<button type="button" onclick={copyEmail} class="btn">
						{#if copied}
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.4"
								aria-hidden="true"
							>
								<path d="M5 12.5 10 17l9-9" />
							</svg>
							Copied
						{:else}
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.7"
								aria-hidden="true"
							>
								<rect x="9" y="9" width="11" height="11" rx="2" /><path
									d="M5 15V5a2 2 0 0 1 2-2h10"
								/>
							</svg>
							{profile.email}
						{/if}
					</button>
				</div>

				<div class="mt-4 flex flex-col gap-3">
					<span class="mono text-[0.7rem] tracking-wider text-muted uppercase">Elsewhere</span>
					<SocialLinks socials={profile.socials} />
				</div>
			</div>

			<form
				class="relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5"
				onsubmit={handleSubmit}
				novalidate
			>
				<div class="flex flex-col gap-1.5">
					<label class="mono text-[0.65rem] tracking-wider text-muted uppercase" for="contact-name"
						>Name</label
					>
					<input
						id="contact-name"
						class="field"
						type="text"
						required
						autocomplete="name"
						bind:value={name}
						placeholder="Ada Lovelace"
					/>
				</div>
				<div class="flex flex-col gap-1.5">
					<label class="mono text-[0.65rem] tracking-wider text-muted uppercase" for="contact-email"
						>Email</label
					>
					<input
						id="contact-email"
						class="field"
						type="email"
						required
						autocomplete="email"
						bind:value={email}
						placeholder="ada@analytical.dev"
					/>
				</div>
				<div class="flex flex-col gap-1.5">
					<label
						class="mono text-[0.65rem] tracking-wider text-muted uppercase"
						for="contact-message">Message</label
					>
					<textarea
						id="contact-message"
						class="field field-area"
						required
						rows="5"
						bind:value={message}
						placeholder="What's on your mind?"
					></textarea>
				</div>
				<button type="submit" class="btn btn-primary self-start">
					Send message
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" />
					</svg>
				</button>
				<p class="m-0 mt-1 text-[0.78rem] text-muted">
					Opens your mail client. Server-side delivery in Phase 3.
				</p>
			</form>
		</div>
	</div>
</section>

<style>
	.field {
		font: inherit;
		font-family: var(--font-body);
		color: var(--text);
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 0.7rem 0.85rem;
		min-height: 42px;
		font-size: 0.95rem;
		transition:
			border-color 200ms ease,
			background-color 200ms ease;
	}

	.field-area {
		min-height: 130px;
		resize: vertical;
		line-height: 1.5;
	}

	.field::placeholder {
		color: var(--muted);
	}

	.field:hover {
		border-color: var(--border-strong);
	}

	.field:focus {
		outline: none;
		border-color: var(--accent);
		background: var(--surface);
	}
</style>
