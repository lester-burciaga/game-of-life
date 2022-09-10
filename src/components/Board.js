import { useState } from 'react';

const NUM_ROWS = 40;
const NUM_COLS = 40;

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    rows.push(Array.from(Array(NUM_COLS), () => 0));
  }
  return rows;
  
};

const Board = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  return (
    <div>
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: `repeat(${NUM_COLS}, 20px`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}/${k}`}
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
    </div>
  );
};

export default Board;
