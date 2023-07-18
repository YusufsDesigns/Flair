type propType = {
    size: string
    color?: string
}

const Loader = ({size, color}: propType) => {
    const style = size === 'big' ? 'lds-ring' : 'lds-ring small'
    const divStyle = color === 'disabled' ? 'disabled' : ''
    return (
        <div className="spinner">
            <div className={style}>
                <div className={divStyle}></div>
                <div className={divStyle}></div>
                <div className={divStyle}></div>
                <div className={divStyle}></div>
            </div>
        </div>
    )
}

export default Loader