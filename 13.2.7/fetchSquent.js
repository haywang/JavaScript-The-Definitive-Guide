const urls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
];

function fetchSequentially(urls) {
  const bodies = [];
  function fetchOne(url) {
    return fetch(url)
      .then((response) => response.text())
      .then((body) => {
        console.log("fetchOne");
        bodies.push(body);
      });
  }

  let p = Promise.resolve(undefined);
  for (url of urls) {
    p = p.then(() => fetchOne(url));
  }

  return p.then(() => bodies);
}

// fetchSequentially(urls).then((bodies) => console.log(bodies));

function promiseSequence(inputs, promiseMaker) {
  inputs = [...inputs];
  function handleNextInput(outputs) {
    if (inputs.length === 0) return outputs;
    else {
      const input = inputs.shift();
      return promiseMaker(input)
        .then((output) => {
          console.log(outputs, output);
          return outputs.concat(output);
        })
        .then(handleNextInput);
    }
  }
  return Promise.resolve([]).then(handleNextInput);
}

function fetchBody(url) {
  return fetch(url).then((r) => r.text());
}

promiseSequence(urls, fetchBody)
  .then((bodies) => console.log(bodies))
  .catch((e) => console.error("e = ", e));
