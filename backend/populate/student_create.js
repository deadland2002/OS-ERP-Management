const myHeaders = new Headers();
myHeaders.append('authorization', '413437b5-36e3-4fe9-9c11-30cd51cf09f9');
myHeaders.append('Content-Type', 'application/json');

const fetchFunction = (studentId) => {
  const raw = JSON.stringify({
    email: `satvik${studentId}@gmail.com`,
    password: '1234',
    name: `satvik ${studentId}`,
    mobileNo: '+919260981510',
    role: 'STUDENT',
  });

  return fetch('localhost:3000/v1/user/create', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};

const start = async () => {
  for (let index = 11; index < 100; index++) {
    await fetchFunction(index);
  }
};

start();
