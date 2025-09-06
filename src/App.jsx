import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Notfound from './Errors/Notfound'
import Layout from './Layout/Layout';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import { useEffect } from 'react';
import Service from './Pages/Service';

function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: 'contact', element: <Contact /> },
        {
          path: 'services', children: [
            { index: true, element: <Services /> },
            { path: ':ServiceSlug', element: <Service /> }
          ]
        },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])

  useEffect(() => {
    const initAOS = () => {
      const isDesktop = window.innerWidth >= 1024;

      AOS.init({
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        offset: 100,
        delay: 100,
        duration: 700,
        easing: 'ease-in-out',
        once: false,
        mirror: false,
        startEvent: 'load',
        disable: false
      });

    };

    // Initialize AOS
    initAOS();

    // Handle window resize
    const handleResize = () => {
      initAOS();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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