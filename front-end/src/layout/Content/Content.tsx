import { Outlet } from "react-router-dom";
import ContentTop from "./ContentTop";
import "../../assets/scss/layout/contentAdmin/content.scss"
const Content = () => {
  return (
    <div className='main-content'>
      <ContentTop />
      <Outlet />
    </div>
  )
}

export default Content
