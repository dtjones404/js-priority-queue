class PriorityQueue {
  constructor(arr = null, minHeap = true, cmp = (x, y) => x - y) {
    this.q = arr === null ? [] : arr.slice();
    this.cmp = minHeap ? cmp : (x, y) => -1 * cmp(x, y);
    this._heapify();
  }
  _heapify = function () {
    for (let i = this.q.length - 1; i >= 0; i--) {
      this._bubbleDown(i);
    }
  };
  _bubbleUp = function (i) {
    let p = (i - 1) >> 1;
    while (i > 0 && this.cmp(this.q[i], this.q[p]) < 0) {
      [this.q[i], this.q[p]] = [this.q[p], this.q[i]];
      [i, p] = [p, (p - 1) >> 1];
    }
  };
  _bubbleDown = function (i) {
    let l, r, lesserChild;
    while (true) {
      (l = 2 * i + 1), (r = 2 * i + 2);

      if (l >= this.q.length) {
        if (r >= this.q.length) break;
        else lesserChild = this.q[r];
      } else if (r >= this.q.length) lesserChild = this.q[l];
      else
        lesserChild =
          this.cmp(this.q[l], this.q[r]) < 0 ? this.q[l] : this.q[r];

      if (this.cmp(this.q[i], lesserChild) < 0) break;

      if (lesserChild === this.q[l]) {
        [this.q[i], this.q[l]] = [this.q[l], this.q[i]];
        i = l;
      } else {
        [this.q[i], this.q[r]] = [this.q[r], this.q[i]];
        i = r;
      }
    }
  };
  get length() {
    return this.q.length;
  }
  push = function (x) {
    this.q.push(x);
    this._bubbleUp(this.q.length - 1);
  };
  pop = function () {
    [this.q[0], this.q[this.q.length - 1]] = [
      this.q[this.q.length - 1],
      this.q[0],
    ];
    const res = this.q.pop();
    if (this.q.length !== 0) this._bubbleDown(0);
    return res;
  };
  peek = function () {
    return this.q[0];
  };
}

module.exports = PriorityQueue;

// const q = new PriorityQueue(
//   [
//     [-3, 7],
//     [2, 1],
//     [-3, 11],
//     [4, 4],
//   ],
//   false,
//   (x, y) => x[0] - y[0]
// );

// const arr = [];
// while (q.length) arr.push(q.pop());
// console.log(arr);
