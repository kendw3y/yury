import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {routes} from './router/routes'
const router = createBrowserRouter(routes)
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router}/>
    </QueryClientProvider>
    
  )
}

export default App