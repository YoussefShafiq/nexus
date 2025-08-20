import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'aos/dist/aos.css';
import Notfound from './Errors/Notfound'
import Layout from './Layout/Layout';
import Home from './Pages/Home';
import Contact from './Pages/Contact';

function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: 'contact', element: <Contact /> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])

  let query = new QueryClient()

  return (
    <>
      <QueryClientProvider client={query}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App