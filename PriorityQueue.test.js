const { expect } = require('@jest/globals');
const PriorityQueue = require('./PriorityQueue');

test('does not mutate input array', () => {
  const arr = [7, 11, -6, 6, 4, 2];
  const q = new PriorityQueue(arr);
  expect(arr).not.toBe(q.q);
  expect(arr).toEqual([7, 11, -6, 6, 4, 2]);
});

test('heapifies values from input array', () => {
  const arr = [7, 11, -6, 6, 4, 2];
  const q = new PriorityQueue(arr);
  const sortedArr = [];
  while (q.length) sortedArr.push(q.pop());
  expect(sortedArr).toEqual(arr.slice().sort((x, y) => x - y));
});

test('heapifies pushed values', () => {
  const arr = [7, 11, -6, 6, 4, 2];
  const q = new PriorityQueue();
  arr.forEach((x) => q.push(x));
  const sortedArr = [];
  while (q.length) sortedArr.push(q.pop());
  expect(sortedArr).toEqual(arr.slice().sort((x, y) => x - y));
});

test('returns `undefined` when popped while empty', () => {
  const q = new PriorityQueue();
  expect(q.pop()).toEqual(undefined);
});

test('becomes a max-heap when second argument is `false`', () => {
  const arr = [7, 11, -6, 6, 4, 2];
  const q = new PriorityQueue(arr, false);
  const sortedArr = [];
  while (q.length) sortedArr.push(q.pop());
  expect(sortedArr).toEqual(arr.slice().sort((x, y) => y - x));
});

test('supports multiparameter sorting with default cmp function', () => {
  const arr = [
    [-3, 7],
    [2, 1],
    [-3, 11],
    [4, 4],
    [0, 0],
    [-3, 5],
    [-1, 7],
  ];
  const minQ = new PriorityQueue(arr);
  const sortedArr = [];
  while (minQ.length) sortedArr.push(minQ.pop());
  expect(sortedArr).toEqual(
    arr.slice().sort((x, y) => x[0] - y[0] || x[1] - y[1])
  );
});

test('supports max-heap multiparameter sorting with default cmp function', () => {
  const arr = [
    [-3, 7],
    [2, 1],
    [-3, 11],
    [4, 4],
    [0, 0],
    [-3, 5],
    [-1, 7],
  ];
  const minQ = new PriorityQueue(arr, false);
  const sortedArr = [];
  while (minQ.length) sortedArr.push(minQ.pop());
  expect(sortedArr).toEqual(
    arr.slice().sort((x, y) => y[0] - x[0] || y[1] - x[1])
  );
});

test('accepts custom comparison callback function', () => {
  const cmp = (x, y) => x[0] - y[0] || y[1] - x[1];
  const arr = [
    [-3, 7],
    [2, 1],
    [-3, 11],
    [4, 4],
    [0, 0],
    [-3, 5],
    [-1, 7],
  ];
  const minQ = new PriorityQueue(arr, true, cmp);
  const sortedArr = [];
  while (minQ.length) sortedArr.push(minQ.pop());
  expect(sortedArr).toEqual(arr.slice().sort(cmp));
});

test('doesn`t produce errors when sorting empty arrays', () => {
  const arr = [[], [], []];
  const q = new PriorityQueue(arr);
  expect(q.q).toEqual(arr);
});

test('peek method returns value at top of heap', () => {
  const arr = [7, 11, -6, 6, 4, 2];
  const q = new PriorityQueue(arr);
  expect(q.peek()).toEqual(-6);
  q.pop();
  expect(q.peek()).toEqual(2);
});

test('peek method doesn`t mutate the heap', () => {
  const arr = [7, 11, -6, 6, 4, 2];
  const q = new PriorityQueue(arr);
  expect(q.peek()).toEqual(-6);
  expect(q.peek()).toEqual(-6);
});

test('provides number of items in queue through the length property', () => {
  const arr = [7, 11, -6, 6, 4, 2];
  const q = new PriorityQueue(arr);
  expect(q.length).toEqual(6);
});
