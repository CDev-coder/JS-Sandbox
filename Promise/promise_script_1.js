// Drill 1: Create and consume a basic promise
const basicPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved!");
  }, 1000);
});

basicPromise.then((result) => console.log(result));

// Drill 2: Promise with error handling
const mightFail = new Promise((resolve, reject) => {
  const random = Math.random();
  setTimeout(() => {
    if (random > 0.5) {
      resolve(`Success! Value: ${random}`);
    } else {
      reject(`Failed! Value: ${random}`);
    }
  }, 500);
});

mightFail
  .then((result) => console.log("Success:", result))
  .catch((error) => console.log("Error:", error))
  .finally(() => console.log("Cleanup complete!"));

// Drill 3: Chaining promises
function wait(time, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), time);
  });
}

wait(1000, "Step 1")
  .then((result) => {
    console.log(result);
    return wait(500, "Step 2");
  })
  .then((result) => {
    console.log(result);
    return wait(300, "Step 3");
  })
  .then((result) => {
    console.log(result);
    return "All steps complete!";
  })
  .then(console.log);
