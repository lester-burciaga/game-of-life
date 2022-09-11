import { useState } from 'react';
import produce from 'immer';

const MATRIX = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const generateEmptyGrid = () => {
  const rows = [];
  MATRIX.forEach((row) => {
    rows.push(Array.from(Array(MATRIX.length), () => 0));
  });

  return rows;
};

const Board = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const handleClick = (x, y) => {
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[x][y] = grid[x][y] ? 0 : 1;
    });
    setGrid(newGrid);
  };

  const randomGrid = () => {
    const rows = [];
    MATRIX.forEach((row) => {
      rows.push(
        Array.from(Array(MATRIX.length), () => (Math.random() > 0.6 ? 1 : 0))
      );
    });
    setGrid(rows);
  };

  return (
    <>
      <button onClick={() => randomGrid()}>Random</button>
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: `repeat(${MATRIX.length}, 20px`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}/${k}`}
              onClick={() => handleClick(i, k)}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? '#333' : '#fff',
                border: 'solid 1px grey',
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Board;
