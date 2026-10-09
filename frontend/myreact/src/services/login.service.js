const api_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const logIn = async (formData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  };
  return fetch(`${api_url}/api/employee/login`, requestOptions);
};

const logOut = () => {
  localStorage.removeItem('employee');
};

const loginService = {
  logIn,
  logOut
};

export default loginService;
