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
  mockApiCall({ users: ["Alice", "Bob"] }, 1000), ///Note the times, these are not in order of resolution. 600 First, then 800, then 1000
  mockApiCall({ posts: ["Post 1", "Post 2"] }, 800),
  mockApiCall({ comments: ["Comment 1"] }, 600),
];

///Lets go through the apiCall array.
Promise.all(apiCalls)
  .then((results) => {
    const [users, posts, comments] = results; //After the results are in, we can destructure them into users, posts, and comments.
    console.log("results: ", results);
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
console.log("END DRILL 6");
