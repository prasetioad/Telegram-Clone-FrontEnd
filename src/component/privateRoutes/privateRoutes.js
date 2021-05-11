import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoutes ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => localStorage.getItem('token')
        ? <Component {...props} /> : <Redirect to='/signin' />}
    />
  )
}

export default PrivateRoutes
