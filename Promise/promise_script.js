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

// Drill 4: Transforming data in chain
const userData = { id: 1, name: "John" };

Promise.resolve(userData)
  .then((user) => ({ ...user, age: 30 }))
  .then((user) => ({ ...user, email: `${user.name.toLowerCase()}@email.com` }))
  .then((user) => ({ ...user, status: "active" }))
  .then((finalUser) => console.log("Processed user:", finalUser));

// Drill 5: Fetch multiple APIs concurrently
const mockApiCall = (data, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

const apiCalls = [
  mockApiCall({ users: ["Alice", "Bob"] }, 1000),
  mockApiCall({ posts: ["Post 1", "Post 2"] }, 800),
  mockApiCall({ comments: ["Comment 1"] }, 600),
];

Promise.all(apiCalls)
  .then((results) => {
    const [users, posts, comments] = results;
    console.log("All data fetched:", { users, posts, comments });
    return results;
  })
  .catch((error) => console.log("One API failed:", error));

// Drill 6: Promise.all with error handling
const tasks = [
  Promise.resolve("Task 1 complete"),
  Promise.reject("Task 2 failed"),
  Promise.resolve("Task 3 complete"),
];

Promise.all(tasks)
  .then(console.log)
  .catch((error) => console.log("Failed because:", error));
