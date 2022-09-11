import { useState, useRef, useCallback } from 'react';
import { MATRIX, OPERATIONS, generateEmptyGrid } from '../constants/types';

import produce from 'immer';
/* produce -> It takes a base state, and a recipe that can be used
 to perform all the desired mutations on the draft that is passed in.*/

const Board = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const handleCellClick = (x, y) => {
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

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        calculateNeighbors(g, gridCopy);
      });
    });

    setTimeout(runSimulation, 150);
  }, []);

  const calculateNeighbors = (grid, gridCopy) => {
    MATRIX.forEach((row, i) => {
      MATRIX.forEach((col, k) => {
        let neighbors = 0;
        OPERATIONS.forEach(([x, y]) => {
          const newI = i + x;
          const newK = k + y;

          neighbors =
            newI >= 0 &&
            newI < MATRIX.length &&
            newK >= 0 &&
            newK < MATRIX.length
              ? (neighbors += grid[newI][newK])
              : neighbors;
        });

        gridCopy[i][k] =
          neighbors < 2 || neighbors > 3
            ? 0
            : grid[i][k] === 0 && neighbors === 3
            ? 1
            : gridCopy[i][k];
      });
    });
  };

  const handleRunClick = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  return (
    <>
      <button onClick={() => handleRunClick()}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => randomGrid()}>Random</button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        Clear
      </button>
      <div
        data-testid='boardGame'
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
              onClick={() => handleCellClick(i, k)}
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
