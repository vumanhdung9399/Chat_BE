const error401 = () => {
  return {
    status: 401,
    data: null,
    message: "Unauthorized",
  };
};

const success200 = (data = null, message = "Successful") => {
  return {
    status: 200,
    data: data,
    message: message,
  };
};

const error422 = (error = null, message = "validation") => {
  return {
    status: 200,
    data: null,
    error: error,
    message: message,
  };
};

const error500 = (error = null, message = "Internal Server Error") => {
  return {
    status: 500,
    data: [],
    message: message
  }
}

module.exports = {
  error401,
  error422,
  success200,
  error500
};
