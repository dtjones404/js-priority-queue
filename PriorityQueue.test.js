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
