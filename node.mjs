export class Node {
  #data;
  #rightNode;
  #leftNode;

  constructor(data) {
    this.#data = data;
    this.#rightNode = null;
    this.#leftNode = null;
  }

  toString() {
    return `Data: ${this.data}`;
  }

  isLeaf() {
    return this.#rightNode === null && this.#leftNode === null;
  }

  hasExactlyOneRightChild() {
    return this.#rightNode && !this.#leftNode;
  }

  hasExactlyOneLeftChild() {
    return this.#leftNode && !this.#rightNode;
  }

  set data(val) {
    this.#data = val;
  }

  get data() {
    return this.#data;
  }

  set right(node) {
    this.#rightNode = node;
  }

  set left(node) {
    this.#leftNode = node;
  }

  get right() {
    return this.#rightNode;
  }

  get left() {
    return this.#leftNode;
  }
}
