function cookFood(menuItem, callback) {
  console.log(`Cooking ${menuItem}...`);
  setTimeout(() => {
    const finishedFood = `Delicious ${menuItem}`;
    console.log(`${finishedFood} is ready!`);
    callback(finishedFood);
  }, 2000);
}

// WITHOUT Promise (callback-based - old way)
function orderFoodBad(menuItem) {
  return new Promise((resolve) => {
    cookFood(menuItem, (finishedFood) => {
      console.log("Better late than never");
      resolve(finishedFood);
    });
  });
}

// WITH Promise (modern way - already returns a promise)
function orderFoodGood(menuItem) {
  return new Promise((resolve) => {
    cookFood(menuItem, resolve);
  });
}

function makeOrder(menuItem) {
  console.log("\n=== Making order for:", menuItem, "===");
  const randomChance = Math.random();
  console.log("Random chance:", randomChance);

  if (randomChance > 0.5) {
    console.log("✓ Kitchen takes in order right now");
    // This returns a promise
    const promise = orderFoodGood(menuItem);
    console.log("Returned promise state:", promise);
    return promise; // Return the promise so .then() works
  } else {
    console.log("✗ Kitchen is busy, will take longer...");
    // This also returns a promise now
    const promise = orderFoodBad(menuItem);
    console.log("Returned promise state:", promise);
    return promise; // Return the promise so .then() works
  }
}

// Test it properly
console.log("=== TEST START ===");

// Option 1: Using .then()
makeOrder("Burger")
  .then((food) => {
    console.log("\n✅ Got my", food);
    console.log("Enjoy your meal!");
  })
  .catch((error) => {
    console.log("\n❌ Error:", error);
  });

console.log("Waiting for food... (this logs immediately)");

// Option 2: Using async/await (run this separately)
async function testAsync() {
  console.log("\n=== ASYNC TEST ===");
  const food = await makeOrder("Pizza");
  console.log("\n✅ Got my", food);
}
// testAsync();
