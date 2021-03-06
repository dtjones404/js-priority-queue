const { expect } = require('@jest/globals');
const PositionalPriorityQueue = require('./PositionalPriorityQueue');

test('does not mutate input array', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  expect(arr).not.toBe(q.q);
  q.push(7, 3); //update value of existing key
  expect(arr).toEqual([
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ]);
});

test('heapifies values from input array', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  const sortedArr = [];
  while (q.length) sortedArr.push(q.pop());
  expect(sortedArr).toEqual(arr.slice().sort((x, y) => x[1] - y[1]));
});

test('heapifies pushed values', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue();
  arr.forEach((x) => q.push(...x));
  const sortedArr = [];
  while (q.length) sortedArr.push(q.pop());
  expect(sortedArr).toEqual(arr.slice().sort((x, y) => x[1] - y[1]));
});

test('returns `undefined` when popped while empty', () => {
  const q = new PositionalPriorityQueue();
  expect(q.pop()).toEqual(undefined);
});

test('becomes a max-heap when second argument is `false`', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr, false);
  const sortedArr = [];
  while (q.length) sortedArr.push(q.pop());
  expect(sortedArr).toEqual(arr.slice().sort((x, y) => y[1] - x[1]));
});

test('peek method returns value at top of heap', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  expect(q.peek()[1]).toEqual(-3);
  q.pop();
  expect(q.peek()[1]).toEqual(0);
});

test('peek method doesn`t mutate the heap', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  expect(q.peek()[1]).toEqual(-3);
  expect(q.peek()[1]).toEqual(-3);
});

test('provides number of items in queue through the length property', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  expect(q.length).toEqual(6);
});

test('has method returns `true` if key present in queue', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  expect(q.has(7)).toEqual(true);
});

test('has method returns `false` if key not present in queue', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  expect(q.has(9)).toEqual(false);
});

test('get method returns value of key in queue', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  expect(q.get(7)).toEqual(4);
});

test('get method returns `undefined` for key not in queue', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  expect(q.get(9)).toEqual(undefined);
});

test('updates existing node with new value if duplicate key is pushed', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const q = new PositionalPriorityQueue(arr);
  q.push(7, 11);
  expect(q.get(7)).toEqual(11);
});

test('bubbles up modified values if necessary', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const minQ = new PositionalPriorityQueue(arr);
  minQ.push(7, -4);
  expect(minQ.peek()[0]).toEqual(7);
  const maxQ = new PositionalPriorityQueue(arr, false);
  maxQ.push(-6, 7);
  expect(maxQ.peek()[0]).toEqual(-6);
});

test('bubbles down modified values if necessary', () => {
  const arr = [
    [7, 4],
    [11, 3],
    [-6, 2],
    [6, 6],
    [4, -3],
    [2, 0],
  ];
  const minQ = new PositionalPriorityQueue(arr);
  minQ.push(4, 4);
  expect(minQ.peek()[0]).toEqual(2);
  const maxQ = new PositionalPriorityQueue(arr, false);
  maxQ.push(6, -2);
  expect(maxQ.peek()[0]).toEqual(7);
});

// test('supports multiparameter sorting with default cmp function', () => {
//   const arr = [
//     [-3, 7],
//     [2, 1],
//     [-3, 11],
//     [4, 4],
//     [0, 0],
//     [-3, 5],
//     [-1, 7],
//   ];
//   const minQ = new PositionalPriorityQueue(arr);
//   const sortedArr = [];
//   while (minQ.length) sortedArr.push(minQ.pop());
//   expect(sortedArr).toEqual(
//     arr.slice().sort((x, y) => x[0] - y[0] || x[1] - y[1])
//   );
// });

// test('supports max-heap multiparameter sorting with default cmp function', () => {
//   const arr = [
//     [-3, 7],
//     [2, 1],
//     [-3, 11],
//     [4, 4],
//     [0, 0],
//     [-3, 5],
//     [-1, 7],
//   ];
//   const minQ = new PositionalPriorityQueue(arr, false);
//   const sortedArr = [];
//   while (minQ.length) sortedArr.push(minQ.pop());
//   expect(sortedArr).toEqual(
//     arr.slice().sort((x, y) => y[0] - x[0] || y[1] - x[1])
//   );
// });

// test('accepts custom comparison callback function', () => {
//   const cmp = (x, y) => x[0] - y[0] || y[1] - x[1];
//   const arr = [
//     [-3, 7],
//     [2, 1],
//     [-3, 11],
//     [4, 4],
//     [0, 0],
//     [-3, 5],
//     [-1, 7],
//   ];
//   const minQ = new PositionalPriorityQueue(arr, true, cmp);
//   const sortedArr = [];
//   while (minQ.length) sortedArr.push(minQ.pop());
//   expect(sortedArr).toEqual(arr.slice().sort(cmp));
// });

// test('doesn`t produce errors when sorting empty arrays', () => {
//   const arr = [[], [], []];
//   const q = new PositionalPriorityQueue(arr);
//   expect(q.q).toEqual(arr);
// });
