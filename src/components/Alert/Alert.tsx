import { useContext, useEffect } from 'react';
import { AlertContext } from '../../context/AlertProvider';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs'
import './Alert.scss'

const Alert = () => {
    const { alert, setAlert } = useContext(AlertContext)

    useEffect(() => {
        setTimeout(() => {
            setAlert({...alert, isAlert: false})
        }, 6000)
    })
    return (
        <div
            style={{backgroundColor: alert.color === 'red' ? '#F44336' : '#4CAF50'}}
            className={alert.isAlert ? 'alert' : 'alert hidden'}
        >
            <div>
                <span>{alert.name}</span>
                <span>{alert.msg}</span>
            </div>
            {alert.isAdd 
                ?   
                    <Link to={'/cart'}>
                        Open Cart <BsArrowRightShort />
                    </Link>
                :   ''
            }
        </div>
    )
}

export default Alert