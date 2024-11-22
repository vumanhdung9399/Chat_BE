const error401 = () => {
  return {
    status: 401,
    data: null,
    message: "Unauthorized",
  };
};

const error404 = (message = "Page not found") => {
  return {
    status: 404,
    data: [],
    message: message
  }
}

const success200 = (data = null, message = "Successful") => {
  return {
    status: 200,
    data: data,
    message: message,
  };
};

const error422 = (error = null, message = "validation") => {
  return {
    status: 422,
    data: null,
    error: error,
    message: message,
  };
};

const error500 = (error = null, message = "Loi he thong, vui long thu lai") => {
  return {
    status: 500,
    data: [],
    message: message
  }
}

const error400 = (message = "Loi he thong, vui long thu lai") => {
  return {
    status: 400,
    data: [],
    message: message
  }
}

module.exports = {
  error401,
  error422,
  success200,
  error500,
  error404,
  error400
};
