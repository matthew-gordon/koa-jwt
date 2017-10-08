module.exports =  function (ctx, next) {
  if (!ctx.state.user) {
    ctx.throw(401, 'Please login.')
  }
  return next()
}
