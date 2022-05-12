class PositionalPriorityQueue {
  constructor(arr = null, isMinHeap = true) {
    this.keyMap = new Map();
    this.q = arr === null ? [] : this._initArray(arr);
    this.isMinHeap = isMinHeap;
    this.cmp = isMinHeap ? (x, y) => x[1] - y[1] : (x, y) => y[1] - x[1];
    this._heapify();
  }
  _initArray(arr) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      res.push(JSON.parse(JSON.stringify(arr[i])));
      this.keyMap.set(arr[i][0], i);
    }
    return res;
  }
  _heapify() {
    for (let i = this.q.length - 1; i >= 0; i--) {
      this._bubbleDown(i);
    }
  }
  _swapNodes(i, j) {
    const node1 = this.q[i];
    const node2 = this.q[j];
    this.keyMap.set(node1[0], j);
    this.keyMap.set(node2[0], i);
    [this.q[i], this.q[j]] = [this.q[j], this.q[i]];
  }
  _bubbleUp(i) {
    let p = (i - 1) >> 1;
    while (i > 0 && this.cmp(this.q[i], this.q[p]) < 0) {
      this._swapNodes(i, p);
      [i, p] = [p, (p - 1) >> 1];
    }
  }
  _bubbleDown(i) {
    let l, r, lesserChild;
    while (true) {
      (l = 2 * i + 1), (r = 2 * i + 2);

      if (l >= this.q.length) break;
      else if (r >= this.q.length) lesserChild = this.q[l];
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
  }
  _update(k, v) {
    const i = this.keyMap.get(k);
    const oldVal = this.q[i][1];
    this.q[i][1] = v;
    if ((this.isMinHeap && oldVal < v) || (!this.isMinHeap && oldVal > v)) {
      this._bubbleDown(i);
    } else this._bubbleUp(i);
  }
  get length() {
    return this.q.length;
  }
  push(k, v) {
    if (this.keyMap.get(k) !== undefined) this._update(k, v);
    else {
      this.q.push([k, v]);
      this.keyMap.set(k, this.q.length - 1);
      this._bubbleUp(this.q.length - 1);
    }
  }
  pop() {
    if (!this.q.length) return;

    this._swapNodes(0, this.q.length - 1);
    const res = this.q.pop();
    this.keyMap.delete(res[0]);
    if (this.q.length !== 0) this._bubbleDown(0);
    return res;
  }
  has(k) {
    return this.keyMap.get(k) !== undefined;
  }
  get(k) {
    const i = this.keyMap.get(k);
    if (i === undefined) return;
    return this.q[i][1];
  }
  peek() {
    return this.q[0];
  }
}

module.exports = PositionalPriorityQueue;
