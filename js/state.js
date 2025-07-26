/**
 * Application state management.
 * 
 * - Holds global constants (EMPTY, BLOCK, FILLED)
 * - Manages grid, grid size, and current mode
 * - Provides getters and setters for controlled state access
 */

export const EMPTY = 0;
export const BLOCK = 1;
export const FILLED = 2;

const DEFAULT_GRID_SIZE = 11;

let grid = [];
let gridSize = DEFAULT_GRID_SIZE;
let mode = null;

export function getGrid() {
	return grid;
}

export function setGrid(newGrid) {
	grid = newGrid;
}

export function getGridSize() {
	return gridSize;
}

export function setGridSize(newSize) {
	gridSize = newSize;
}

export function getMode() {
	return mode;
}

export function setMode(newMode) {
	mode = newMode;
}
