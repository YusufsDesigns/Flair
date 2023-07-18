/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactElement, useState } from "react"

type alertType = {
    isAlert: boolean
    isAdd: boolean
    name: string
    msg: string
    color: string
}

type alertContextType = {
    alert: alertType
    setAlert: React.Dispatch<React.SetStateAction<alertType>>
}

const initAlertContext: alertContextType = {
    alert: {
        isAlert: false,
        isAdd: false,
        name: '',
        msg: '',
        color: '',
    },
    setAlert: () => {}
}

export const AlertContext = createContext(initAlertContext)

type childrenType = {
    children?: ReactElement | ReactElement[]
}

const AlertProvider = ({children}: childrenType) => {
    const [alert, setAlert] = useState<alertType>({
        isAlert: false,
        isAdd: false,
        name: '',
        msg: '',
        color: '',
    })
    return (
        <AlertContext.Provider value={{alert, setAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider