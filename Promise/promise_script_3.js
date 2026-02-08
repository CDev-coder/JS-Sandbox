// Without Promise - Like paying immediately with no guarantee
function orderFoodBad(menuItem) {
  cookFood(menuItem); // Starts cooking... somewhere
  return "Order placed maybe?"; // No way to track
}

// With Promise - Like getting a pager/buzzer
function orderFoodGood(menuItem) {
  return new Promise((resolve) => {
    cookFood(menuItem, (finishedFood) => {
      resolve(finishedFood); // Buzzer goes off!
    });
  });
}

function cookFood(menuItem, callback) {
  console.log(`Cooking ${menuItem}...`);
  setTimeout(() => {
    // Simulate cooking time
    const finishedFood = `Delicious ${menuItem}`;
    console.log(`${finishedFood} is ready!`);
    callback(finishedFood); // Notify that food is ready
  }, 2000); // Simulate cooking time
}

// Usage:
const foodPromise = orderFoodGood("Burger");
foodPromise.then((food) => console.log("Got my", food));
