
import { Products } from '../../components'
import './Home.scss'

const Home = () => {
    return (
        <>
            <div className='header align-items'>
                <h1>Flair</h1>
                <p>Expertly designed goods for your workspace, home and travel</p>
            </div>
            <Products />
        </>
    )
}

export default Home