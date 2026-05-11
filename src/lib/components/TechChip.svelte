<script lang="ts">
	interface Props {
		label: string;
	}
	let { label }: Props = $props();
</script>

<span class="chip">{label}</span>
