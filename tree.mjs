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

  find(value, root = this.#root) {
    if (root?.data === value) {
      return root;
    } else {
      if (root?.data > value) {
        return this.find(value, root.left);
      } else if (root?.data < value) {
        return this.find(value, root.right);
      }
    }
    return null;
  }

  levelOrder(cb, root = this.#root) {
    if (!cb) {
      throw new Error("A callback is missing.");
    }
    if (root === null) {
      return null;
    }
    let queue = [root];
    while (queue.length > 0) {
      const curNode = queue.shift();
      cb(curNode.data);
      if (curNode.left) {
        queue.push(curNode.left);
      }
      if (curNode.right) {
        queue.push(curNode.right);
      }
    }
    return;
  }

  preOrder(cb, root = this.#root) {
    if (!cb) {
      throw new Error("A callback is missing.");
    }
    if (root === null) {
      return null;
    }
    cb(root.data);
    this.preOrder(cb, root.left);
    this.preOrder(cb, root.right);

    return;
  }

  inOrder(cb, root = this.#root) {
    if (!cb) {
      throw new Error("A callback is missing.");
    }
    if (root === null) {
      return null;
    }
    this.inOrder(cb, root.left);
    cb(root.data);
    this.inOrder(cb, root.right);

    return;
  }

  postOrder(cb, root = this.#root) {
    if (!cb) {
      throw new Error("A callback is missing.");
    }
    if (root === null) {
      return null;
    }
    this.postOrder(cb, root.left);
    this.postOrder(cb, root.right);
    cb(root.data);

    return;
  }

  isBalanced() {
    if (this.#root.isLeaf()) {
      return true;
    }
    const leftHeight = this.height(this.#root.left);
    const rightHeight = this.height(this.#root.right);
    return Math.abs(leftHeight - rightHeight) <= 1;
  }

  depth(node, root = this.#root) {
    if (node === null || node.data === root.data) {
      return 0;
    }
    if (node.data > root.data) {
      return 1 + this.depth(node, root.right);
    } else {
      return 1 + this.depth(node, root.left);
    }
  }
  height(node) {
    if (node === null || node.isLeaf()) {
      return 0;
    }
    const leftH = 1 + this.height(node.left);
    const rightH = 1 + this.height(node.right);
    if (leftH > rightH) {
      return leftH;
    } else {
      return rightH;
    }
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

  rebalance() {
    let arr = [];
    this.inOrder((el) => arr.push(el));
    this.#root = this.buildTree(arr);
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
