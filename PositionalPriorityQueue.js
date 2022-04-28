class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}

class PositionalPriorityQueue {
  constructor(arr = null, isMinHeap = true) {
    this.keyMap = new Map();
    this.q = arr === null ? [] : this._initArray(arr);
    this.isMinHeap = isMinHeap;
    this.cmp = isMinHeap ? (x, y) => x.val - y.val : (x, y) => y.val - x.val;
    this._heapify();
  }
  _initArray = function (arr) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      const [k, v] = arr[i];
      const node = new Node(k, v);
      res.push(node);
      this.keyMap.set(k, i);
    }
    return res;
  };
  _heapify = function () {
    for (let i = this.q.length - 1; i >= 0; i--) {
      this._bubbleDown(i);
    }
  };
  _swapNodes = function (i, j) {
    const node1 = this.q[i];
    const node2 = this.q[j];
    this.keyMap.set(node1.key, j);
    this.keyMap.set(node2.key, i);
    [this.q[i], this.q[j]] = [this.q[j], this.q[i]];
  };
  _bubbleUp = function (i) {
    let p = (i - 1) >> 1;
    while (i > 0 && this.cmp(this.q[i], this.q[p]) < 0) {
      this._swapNodes(i, p);
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
        this._swapNodes(i, l);
        i = l;
      } else {
        this._swapNodes(i, r);
        i = r;
      }
    }
  };
  _update = function (k, v) {
    const i = this.keyMap.get(k);
    const oldVal = this.q[i].val;
    this.q[i].val = v;
    if ((this.isMinHeap && oldVal < v) || (!this.isMinHeap && oldVal > v)) {
      console.log(this.isMinHeap, oldVal, v, 'down');
      this._bubbleDown(i);
    } else this._bubbleUp(i);
  };
  get length() {
    return this.q.length;
  }
  push = function (k, v) {
    if (this.keyMap.get(k) !== undefined) this._update(k, v);
    else {
      const node = new Node(k, v);
      this.q.push(node);
      this.keyMap.set(k, this.q.length - 1);
      this._bubbleUp(this.q.length - 1);
    }
  };
  pop = function () {
    if (!this.q.length) return;

    this._swapNodes(0, this.q.length - 1);
    const res = this.q.pop();
    this.keyMap.delete(res.key);
    if (this.q.length !== 0) this._bubbleDown(0);
    return res;
  };
  has = function (k) {
    return this.keyMap.get(k) !== undefined;
  };
  get = function (k) {
    const i = this.keyMap.get(k);
    if (i === undefined) return;
    return this.q[i].val;
  };
  peek = function () {
    return this.q[0];
  };
}

module.exports = PositionalPriorityQueue;
