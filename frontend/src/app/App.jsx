import React from 'react'
import { RouterProvider } from 'react-router'
import { appRouter } from './app.routes'

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App