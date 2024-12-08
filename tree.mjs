import { Node } from "./node.mjs";

export class Tree {
  #arr;

  constructor(arr) {
    //sort the array and remove the duplicates
    this.#arr = this.#sort(arr.slice());
    this.prettyPrint(this.buildTree(this.#arr));
  }

  insert(value) {
    
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    let midp = start + Math.floor((end - start) / 2);
    const rootNode = new Node(arr[midp]);
    rootNode.left = this.buildTree(arr, start, midp - 1);
    rootNode.right = this.buildTree(arr, midp + 1, end);
    return rootNode;
  }

  #sort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const midp = Math.floor(arr.length / 2);
    const left = this.#sort(arr.slice(0, midp));
    const right = this.#sort(arr.slice(midp, arr.length));
    return this.#merge(left, right);
  }

  #merge(leftArr, rightArr) {
    let res = [];
    do {
      if (leftArr.length === 0) {
        rightArr.forEach((item) => res.push(item));
        rightArr = [];
      } else if (rightArr.length === 0) {
        leftArr.forEach((item) => res.push(item));
        leftArr = [];
      } else if (leftArr[0] < rightArr[0]) {
        res.push(leftArr.shift());
      } else {
        res.push(rightArr.shift());
      }
    } while (leftArr.length > 0 || rightArr.length > 0);

    return Array.from(new Set(res)); //get rid of duplicates on return
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
