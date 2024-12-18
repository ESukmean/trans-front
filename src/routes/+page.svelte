<script>
	import Frame from '$lib/Frame.svelte';
</script>

<Frame>
	<style>
		body {
			font-family: Arial, sans-serif;
			margin: 0;
			padding: 0;
		}

		.table-container {
			position: relative;
			width: 100%;
			height: 400px; /* Adjust height as needed */
			overflow: auto;
			border: 1px solid #ccc;
		}

		.inner-table {
			display: grid;
			grid-template-rows: auto 1fr;
			position: relative;
			width: max-content; /* Ensures horizontal scrolling for large data */
			height: 100%;
		}

		.sticky-header {
			display: grid;
			grid-template-columns: repeat(30, 70px); /* Adjust column count */
			position: sticky;
			top: 0;
			background-color: #f1f1f1;
			z-index: 3;
			border-bottom: 1px solid #ccc;
		}

		.scrollable-content {
			display: grid;
			grid-template-columns: repeat(30, 70px); /* Ensure alignment with header */
		}

		.row {
			display: contents;
		}

		.cell {
			padding: 8px;
			border: 1px solid #ddd;
			text-align: left;
			white-space: nowrap;
		}

		.cell.sticky-column {
			width: 280px;
			position: sticky;
			left: 0;
			z-index: 2;
			background-color: #f9f9f9;
			border-right: 1px solid #ccc;
			grid-column: span 4;
		}

		.sticky-header .sticky-column {
			z-index: 4; /* Ensure header sticky columns are on top */
		}

		.table-container::-webkit-scrollbar {
			width: 10px;
			height: 10px;
		}

		.table-container::-webkit-scrollbar-thumb {
			background: #888;
			border-radius: 5px;
		}

		.table-container::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	</style>
	<div class="table-container">
		<div class="inner-table">
			<div class="sticky-header sticky-columns">
				<div class="cell sticky-column">Header 1</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
				<div class="cell">✅</div>
			</div>
			<div class="scrollable-content">
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
									<div class="cell">✅</div>
				</div>
				<div class="row">
					<div class="cell sticky-column">Row 1, Col 1</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
					<div class="cell">✅</div>
				</div>
			</div>
		</div>
	</div>
</Frame>
