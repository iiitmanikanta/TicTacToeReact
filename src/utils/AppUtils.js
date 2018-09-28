export const getGridArray = gridSize => {
  const noOfBlocks = gridSize * gridSize
  const grid = []
  for (let i = 0; i < noOfBlocks; i++) {
    grid.push('')
  }
  return grid
}

export const winningCombinations = gridSize => {
  const positions = []
  let count = 0
  let temp = []
  // having 2 x 2 array of 2n + 2 possible lines in tic tac toe game
  for (let i = 1; i <= gridSize * gridSize; i++) {
    temp.push(count)
    if (i % gridSize === 0) {
      positions.push(temp)
      temp = []
    }
    count++
  }

  const combinations = []
  // for rows
  for (let i = 0; i < gridSize; i++) {
    let combination = []
    for (let j = 0; j < gridSize; j++) {
      combination.push(positions[i][j])
    }
    combinations.push(combination)
  }

  // for cols
  for (let i = 0; i < gridSize; i++) {
    let combination = []
    for (let j = 0; j < gridSize; j++) {
      combination.push(positions[j][i])
    }
    combinations.push(combination)
  }

  // for left to right diagonal
  let combination = []
  for (let i = 0; i < gridSize; i++) {
    combination.push(positions[i][i])
  }
  combinations.push(combination)

  // for right to left diagonal
  combination = []
  let k = gridSize - 1
  for (let i = 0; i < gridSize; i++) {
    combination.push(positions[i][k])
    k -= 1
  }
  combinations.push(combination)

  return combinations
}
