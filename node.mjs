export class Node {
  #data;
  #rightNode;
  #leftNode;

  constructor(data) {
    this.#data = data;
    this.#rightNode = null;
    this.#leftNode = null;
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
