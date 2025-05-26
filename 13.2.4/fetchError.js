fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => {
    if (!response.ok) {
      return null;
    }

    let type = response.headers.get("content-type");
    if (!type.includes("application/json")) {
      throw new TypeError(`Expected JSON, got ${type}`);
    }

    return response.json();
  })
  .then((profile) => {
    if (profile) {
      console.log("User profile:", profile);
    } else {
      console.log("invoke displayLoggedOutProfilePage()");
    }
  })
  .catch((e) => {
    if (e instanceof TypeError) {
      console.log("Something is wrong with our server!");
      console.log(e);
    } else {
      console.error(e);
    }
  });
