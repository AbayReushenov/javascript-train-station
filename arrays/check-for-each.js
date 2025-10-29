function test(arr, func) {
  return arr.forEach(func);
}

const currentArray = [1,2]
const correntFunc = console.log

test(currentArray, correntFunc)

// $ node arrays/check-for-each.js
// Debugger attached.
// 1 0 [ 1, 2 ]
// 2 1 [ 1, 2 ]
// Waiting for the debugger to disconnect...
