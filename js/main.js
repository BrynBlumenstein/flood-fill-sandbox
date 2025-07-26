/**
 * Main entry point.
 * 
 * - Initializes the app on DOMContentLoaded
 * - Wires UI controls to logic and state updates
 * - Delegates grid rendering and mode switching
 * 
 * Depends on:
 * - state.js for app state management
 * - dom.js for DOM elements and rendering
 * - grid.js for grid logic
 */

import { setGrid, getGridSize, setGridSize, setMode } from './state.js';

import {
	gridSizeInputEl,
	gridSizeEl,
	activeModeEl,
	fillAreaEl,
	editBlocksEl,
	randomizeGridEl,
	clearGridEl,
	renderGrid
} from './dom.js';

import { generateGrid, randomizeGrid, clearGrid, resizeGrid } from './grid.js';

document.addEventListener('DOMContentLoaded', function () {
	setGrid(generateGrid(getGridSize()));
	renderGrid();

	gridSizeInputEl.addEventListener('input', (event) => {
		const newSize = parseInt(event.target.value);
		setGridSize(newSize);
		resizeGrid(newSize);
		gridSizeEl.textContent = newSize;
		renderGrid();
	});

	fillAreaEl.addEventListener('click', () => {
		setMode('fill');
		activeModeEl.textContent = 'Fill';
		fillAreaEl.disabled = true;
		editBlocksEl.disabled = false;
	});

	editBlocksEl.addEventListener('click', () => {
		setMode('edit');
		activeModeEl.textContent = 'Edit';
		editBlocksEl.disabled = true;
		fillAreaEl.disabled = false;
	});

	randomizeGridEl.addEventListener('click', () => {
		randomizeGrid();
		renderGrid();
	});

	clearGridEl.addEventListener('click', () => {
		clearGrid();
		renderGrid();
	});
});
