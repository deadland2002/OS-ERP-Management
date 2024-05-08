const axios = require('axios');

const fetchFunction = (studentId) => {
  const raw = {
    email: `student${studentId}@gmail.com`,
    password: '1234',
    name: `student ${studentId}`,
    mobileNo: `+9192609815${studentId}`,
    role: 'STUDENT',
  };

  return axios
    .post('http://localhost:3000/v1/user/create', raw, {
      headers: {
        authorization: `54664a05-1936-4316-9964-77956bf40e31`,
      },
    })
    .then((response) => response.data)
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};

const start = async () => {
  for (let index = 11; index < 100; index++) {
    await fetchFunction(index);
  }
};

start();
