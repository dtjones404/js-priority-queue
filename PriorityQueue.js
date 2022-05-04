class PriorityQueue {
  constructor(arr = null, isMinHeap = true, cmp = this._multiparameterSort) {
    this.q = arr === null ? [] : arr.slice();
    this.cmp = isMinHeap ? cmp : (x, y) => -1 * cmp(x, y);
    this._heapify();
  }
  _multiparameterSort(x, y) {
    if (x.length === undefined) return x - y;

    for (let i = 0; i < x.length; i++) {
      if (x[i] !== y[i]) return x[i] - y[i];
    }

    return 0;
  }
  _heapify() {
    for (let i = this.q.length - 1; i >= 0; i--) {
      this._bubbleDown(i);
    }
  }
  _bubbleUp(i) {
    let p = (i - 1) >> 1;
    while (i > 0 && this.cmp(this.q[i], this.q[p]) < 0) {
      [this.q[i], this.q[p]] = [this.q[p], this.q[i]];
      [i, p] = [p, (p - 1) >> 1];
    }
  }
  _bubbleDown(i) {
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
  }
  get length() {
    return this.q.length;
  }
  push(x) {
    this.q.push(x);
    this._bubbleUp(this.q.length - 1);
  }
  pop() {
    if (!this.q.length) return;

    [this.q[0], this.q[this.q.length - 1]] = [
      this.q[this.q.length - 1],
      this.q[0],
    ];
    const res = this.q.pop();
    if (this.q.length !== 0) this._bubbleDown(0);
    return res;
  }
  peek() {
    return this.q[0];
  }
}

module.exports = PriorityQueue;
