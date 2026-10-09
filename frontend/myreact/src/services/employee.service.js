// Import from the env 
const api_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// A function to send post request to create a new employee 
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
  console.log('createEmployee request', requestOptions);
  const response = await fetch(`${api_url}/api/employee/add`, requestOptions);
  return response;
}
// Export all the functions 
const employeeService = {
  createEmployee
}
export default employeeService; 