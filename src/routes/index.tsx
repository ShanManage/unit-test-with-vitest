
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  Dashboard,
  Login,
} from '../pages'
import { APP_ROUTES } from '../utils/constants'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={APP_ROUTES.ROOT} element={<Login />} />
      <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
    </Route>
  )
)

const AppRoutes = () => {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>}/>
}
export default AppRoutes
