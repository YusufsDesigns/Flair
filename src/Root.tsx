import { Outlet } from "react-router-dom"
import { Alert, Footer, Navbar } from "./components"


const Root = () => {
    return (
        <div className="container">
            <Navbar />
            <Outlet />
            <Alert />
            <Footer />
        </div>
        
    )
}

export default Root