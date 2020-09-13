import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import StockTable from './stockTable'
import { useGlobal, setGlobal } from 'reactn'


const UserPage = () => {
    const user = useSelector(state => state.user)
    let stocksArray = [user.credentials]
    const [ global, setGlobal ] = useGlobal([]);
    setGlobal(stocksArray)


    return (
        <div style={{position: 'relative', width: '90vw', height: '50vh'}}>
            {console.log(user.credentials.symbols)}
            <StockTable allSymbols={stocksArray}/>
        </div>
    )
}

export default UserPage