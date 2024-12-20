import { Tree } from "./tree.mjs";

const t = new Tree([10, 3, 2, 1, 13, 5, 2, 3, 4]);

t.insert(16);

t.insert(17);

t.prettyPrint();

let node = t.find(6);
if (!t.isBalanced()) {
  t.rebalance();
}

t.prettyPrint();
