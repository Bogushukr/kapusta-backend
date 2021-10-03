const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  NO_CONTENT: 204,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500
}


const status = {
  ERROR: 'error',
  SUCCESS: 'success',
  FAIL: 'fail',
}


module.exports = {
  HttpCode,
  status
}