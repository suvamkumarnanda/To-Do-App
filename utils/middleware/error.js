exports.error = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
    res.json({
      message: err.message,
      statusCode,
    });
  };
  