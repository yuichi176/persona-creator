import React from 'react'
import ReactDOM from 'react-dom/client'
import 'the-new-css-reset/css/reset.css'
import './index.css'
import Layout from '@/components/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TopPage from 'src/components/TopPage'
import CreatePersonaDialog from 'src/components/CreatePersonaPage'
import ErrorPage from '@/components/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TopPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/create',
    element: <CreatePersonaDialog />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>,
)
