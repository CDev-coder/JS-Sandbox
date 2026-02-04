function TreeConstructor(strArr) {
  const parents = {};
  const children = {};

  for (let pair of strArr) {
    // Simple parsing - remove parentheses and split
    const clean = pair.replace("(", "").replace(")", "");
    const parts = clean.split(",");
    const child = parseInt(parts[0]);
    const parent = parseInt(parts[1]);

    // Check if child already has a parent
    if (children[child]) return false;
    children[child] = parent;

    // Track children for each parent
    if (!parents[parent]) parents[parent] = [];
    parents[parent].push(child);

    // Check if parent has more than 2 children
    if (parents[parent].length > 2) return false;
  }

  // Find root(s) - nodes that are never children
  const allNodes = new Set();
  const allChildren = new Set(Object.keys(children).map(Number));

  // Add all nodes mentioned
  for (let pair of strArr) {
    const clean = pair.replace("(", "").replace(")", "");
    const parts = clean.split(",");
    allNodes.add(parseInt(parts[0]));
    allNodes.add(parseInt(parts[1]));
  }

  // Roots are nodes that are not children
  let roots = 0;
  for (let node of allNodes) {
    if (!allChildren.has(node)) roots++;
  }

  return roots === 1;
}

console.log(TreeConstructor(["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)"]));

// Export if needed for modules
module.exports = { TreeConstructor };
