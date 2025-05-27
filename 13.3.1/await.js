let response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
let body = await response.json();
console.log(body);
