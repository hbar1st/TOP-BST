import { Node } from "./node.mjs";

export class Tree {
  #root;

  constructor(arr) {
    //sort the array and remove the duplicates then build the tree
    this.#root = this.buildTree(this.#sort(arr.slice()));
  }

  delete(value, root = this.#root) {
    if (root) {
      if (root.data < value) {
        root.right = this.delete(value, root.right);
      } else if (root.data > value) {
        root.left = this.delete(value, root.left);
      } else if (root.data === value) {
        if (root.isLeaf()) {
          root.data = null;
          root = null;
        } else if (root.hasExactlyOneRightChild()) {
          return root.right;
        } else if (root.hasExactlyOneLeftChild()) {
          return root.left;
        } else {
          const subsequentNode = this.findSubsequentNode(root);
          root.data = subsequentNode.data;
          root.right = this.delete(subsequentNode.data, root.right);
        }
      }
    }
    return root;
  }

  findSubsequentNode(root) {
    let cur = root.right;

    while (cur?.left) {
      cur = cur.left;
    }

    return cur;
  }

  insert(value, root = this.#root) {
    if (root.data < value) {
      if (root.right === null) {
        root.right = new Node(value);
      } else {
        this.insert(value, root.right);
      }
    } else if (root.data > value) {
      if (root.left === null) {
        root.left = new Node(value);
      } else {
        this.insert(value, root.left);
      }
    }
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

  prettyPrint(node = this.#root, prefix = "", isLeft = true) {
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
