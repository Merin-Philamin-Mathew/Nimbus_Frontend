import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import routes from './config/routes';

const router = createBrowserRouter(routes); // Correctly creating the router

function App() {

  return (
    <>
     <Toaster position="top-right" richColors={true} />
     <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
