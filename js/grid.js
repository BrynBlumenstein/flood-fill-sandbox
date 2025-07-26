/**
 * Grid logic and manipulation.
 * 
 * - Generates, randomizes, clears, and resizes the grid
 * - Performs flood fill on EMPTY cells
 * 
 * Depends on:
 * - state.js for accessing and mutating the grid
 */

import { EMPTY, BLOCK, FILLED, getGrid, setGrid } from './state.js';

export function generateGrid(gridSize) {
	const newGrid = Array.from({ length: gridSize }, () =>
		Array.from({ length: gridSize }, () => EMPTY)
	);
	setGrid(newGrid);
	return newGrid;
}

export function randomizeGrid() {
	const grid = getGrid();
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			const isEmpty = Math.floor(Math.random() * 2);
			grid[row][col] = isEmpty ? EMPTY : BLOCK;
		}
	}
}

export function clearGrid() {
	const grid = getGrid();
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			grid[row][col] = EMPTY;
		}
	}
}

export function resizeGrid(newSize) {
	const grid = getGrid();
	const oldSize = grid.length;
	const change = newSize - oldSize;

	if (change < 0) {
		shrinkGrid(grid, newSize);
	} else if (change > 0) {
		growGrid(grid, newSize);
	}
}

function shrinkGrid(grid, newSize) {
	grid.length = newSize;
	grid.forEach((row) => (row.length = newSize));
}

function growGrid(grid, newSize) {
	grid.forEach((row) => row.push(...Array(newSize - row.length).fill(BLOCK)));
	grid.push(
		...Array.from({ length: newSize - grid.length }, () =>
			Array(newSize).fill(BLOCK)
		)
	);
}

export function floodFill(row, col) {
	const grid = getGrid();
	const numRows = grid.length;
	const numCols = grid[0].length;

	if (row < 0 || col < 0 || row >= numRows || col >= numCols) {
		return;
	}

	const cell = grid[row][col];

	if (cell !== EMPTY) {
		return;
	}

	grid[row][col] = FILLED;
	floodFill(row - 1, col);
	floodFill(row, col + 1);
	floodFill(row + 1, col);
	floodFill(row, col - 1);
}
