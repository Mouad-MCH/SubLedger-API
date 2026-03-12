
const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    ERROR: err.message
  })
}


export const errHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Somthing worng';
  
  sendError(err, res)
}