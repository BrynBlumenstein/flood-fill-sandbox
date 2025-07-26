/**
 * DOM handling and rendering.
 * 
 * - Caches key DOM elements
 * - Renders the current grid from state
 * - Handles user interaction with individual grid cells
 * 
 * Depends on:
 * - state.js for grid and mode data
 * - grid.js for flood fill logic
 */

import { floodFill } from './grid.js';
import { EMPTY, BLOCK, FILLED, getMode, getGrid } from './state.js';

const gridContainerEl = document.getElementById('grid-container');

export const gridSizeInputEl = document.getElementById('grid-size-input');
export const gridSizeEl = document.getElementById('grid-size');
export const activeModeEl = document.getElementById('active-mode');
export const fillAreaEl = document.getElementById('fill-area');
export const editBlocksEl = document.getElementById('edit-blocks');
export const randomizeGridEl = document.getElementById('randomize-grid');
export const clearGridEl = document.getElementById('clear-grid');

export function renderGrid() {
	const grid = getGrid();
	gridContainerEl.innerHTML = '';
	gridContainerEl.style.gridTemplateColumns = `repeat(${grid.length}, 1fr)`;

	grid.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			const cellEl = document.createElement('button');
			const cellStyle =
				cell === EMPTY ? 'empty' : cell === BLOCK ? 'block' : 'filled';
			cellEl.className = cellStyle;
			cellEl.addEventListener('click', (event) =>
				handleCellClick(event.target, rowIndex, colIndex)
			);
			gridContainerEl.appendChild(cellEl);
		});
	});
}

function handleCellClick(cell, row, col) {
	const mode = getMode();

	switch (mode) {
		case 'fill':
			handleFillMode(row, col);
			break;
		case 'edit':
			handleEditMode(cell, row, col);
			break;
		default:
			break;
	}
}

function handleFillMode(row, col) {
	floodFill(row, col);
	renderGrid();
}

function handleEditMode(cell, row, col) {
    const grid = getGrid();
	const numRows = grid.length;
	const numCols = grid[0].length;

	grid[row][col] = grid[row][col] === BLOCK ? EMPTY : BLOCK;
	cell.className = grid[row][col] === BLOCK ? 'block' : 'empty';

	if (cell.className === 'empty') {
        // Re-fill if any neighboring cell is filled
		if (
			(row - 1 >= 0 && grid[row - 1][col] === FILLED) ||
			(col + 1 < numCols && grid[row][col + 1] === FILLED) ||
			(row + 1 < numRows && grid[row + 1][col] === FILLED) ||
			(col - 1 >= 0 && grid[row][col - 1] === FILLED)
		) {
			floodFill(row, col);
			renderGrid();
		}
	}
}
