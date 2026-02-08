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
      console.log("Better late than never"); //Message comes after the cook
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

/////////START THE CLOCK
console.log("=== TEST START ===");
const startTime = Date.now();

// Option 1: Using .then()

function testAsync_1() {
  console.log(
    `Aysnc Order using a then placed at ${new Date().toLocaleTimeString()}`,
  );
  makeOrder("Burger").then((food) => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    console.log(`\n⏱️ Order completed in ${timeTaken} seconds`);
    console.log(`✅ Got my ${food}`);
  });
}
testAsync_1();

// Option 2: Using async/await
async function testAsync_2() {
  console.log(
    `Async Order using a await placed at ${new Date().toLocaleTimeString()}`,
  );
  const food = await makeOrder("Pizza").then((food) => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    console.log(`\n⏱️ Order completed in ${timeTaken} seconds`);
    console.log(`✅ Got my ${food}`);
  });
}
testAsync_2();
