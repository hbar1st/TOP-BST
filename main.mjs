import { Tree } from "./tree.mjs";

const t = new Tree([10, 3, 2, 1, 13, 5, 2, 3, 4]);

t.insert(6);

t.insert(7);

t.prettyPrint();

t.delete(4);

t.prettyPrint();
