import { Outlet } from 'react-router-dom'
import Menu from './Menu'

const DefaultLayout = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
}

export default DefaultLayout
