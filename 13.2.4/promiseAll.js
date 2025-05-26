const urls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
];

promises = urls.map((url) => fetch(url).then((r) => r.json()));

Promise.all(promises)
  .then((data) => {
    console.log(data);
  })
  .catch((e) => console.error(e));

Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3]).then(
  (results) => {
    console.log(results);
  }
);
