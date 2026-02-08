/*
    A Simple example of async with a then function and an await call. 
    testAsync_1 uses the then when its Promise is fulfilled 
    testAsync_2 uses the await when its Promise is fulfilled 
*/

function cookFood(menuItem, callback) {
  console.log(`Cooking ${menuItem}...`);
  setTimeout(() => {
    const finishedFood = `Delicious ${menuItem}`;
    console.log(`\n${finishedFood} is ready!`);
    callback(finishedFood);
  }, 2000);
}

// WITHOUT Promise (callback-based - old way)
function orderFoodBad(menuItem) {
  return new Promise((resolve, reject) => {
    cookFood(menuItem, (finishedFood) => {
      console.log("Better late than never");
      const randomChance = Math.random();
      console.log("Random chance:", randomChance);
      if (randomChance > 0.5) {
        resolve(finishedFood);
      } else {
        reject("SOMETHING IS UNDERCOOKED");
      }
    });
  });
}

// WITH Promise (modern way - already returns a promise)
function orderFoodGood(menuItem) {
  //////Makes a new instance of Promise, includes a callback of resolve which will get returned from the orderFoodGood call's return
  return new Promise((resolve) => {
    // Define what happens when food is ready
    const handleFoodReady = (finishedFood) => {
      console.log("FOOD IS READY");
      resolve(finishedFood); // Resolve the promise with the food
    };
    // Start cooking with our handler
    cookFood(menuItem, handleFoodReady);
  });
}

function makeOrder(menuItem) {
  console.log("\n=== Making order for:", menuItem, "===");
  const randomChance = Math.random();
  console.log("Random chance:", randomChance);
  if (randomChance > 0.5) {
    console.log("✓ Kitchen takes in order right now");
    return orderFoodGood(menuItem);
  } else {
    console.log("✗ Kitchen is busy, will take longer...");
    return orderFoodBad(menuItem);
  }
}

///////// START THE CLOCK
console.log("=== TEST START ===");
const startTime = Date.now();

// Option 1: Using .then() - PROPER error handling
function testAsync_1() {
  console.log(
    `Async Order using .then() placed at ${new Date().toLocaleTimeString()}`,
  );

  makeOrder("Burger")
    .then((food) => {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000;
      console.log(`\n⏱️ Order completed in ${timeTaken} seconds`);
      console.log(`✅ Got my ${food}`);
    })
    .catch((error) => {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000;
      console.log(`\n⏱️ Order failed after ${timeTaken} seconds`);
      console.log(`❌ Walk away with issue: ${error}`);
    });
}
testAsync_1();

// Option 2: Using async/await
async function testAsync_2() {
  console.log(
    `Async Order using await placed at ${new Date().toLocaleTimeString()}`,
  );

  try {
    const food = await makeOrder("Pizza"); // ✅ Just await, no .then()
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    console.log(`\n⏱️ Order completed in ${timeTaken} seconds`);
    console.log(`✅ Got my ${food}\n`);
  } catch (error) {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    console.log(`\n⏱️ Order failed after ${timeTaken} seconds`);
    console.log(`❌ Walk away with issue: ${error}`);
  }
}
testAsync_2();
