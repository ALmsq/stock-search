import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavDiv, NavItem, NavLink } from './navbar.styled'
import { UserOutlined, StockOutlined } from '@ant-design/icons'
import { logoutUser } from '../../Redux/actions/authActions'
import SingleTicker from './singleTicker'
import SingleTicker2 from './singleTicker2'
import SymbolOverview from './SymbolOverview'
import {Helmet} from 'react-helmet'
import axios from 'axios'


const Navbar = (props) => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const logoutClick = () => {
        setTimeout(() => {             //tries to reload before post request
            dispatch(logoutUser())
          }, 10);
    }

    const [stocks, setStocks] = useState([])

    useEffect( async () => {
        const res = await axios.get(`https://stock-search-backend.herokuapp.com/api/users/stocks/${user.id}`)
    console.log(res.data)
    setStocks(res.data.stocks)
    },[])

    

    return (
        <div>
            {console.log(stocks)}
            <NavDiv>
                <NavItem style={{}}>
                    <StockOutlined style={{position: 'relative', fontSize: '20px'}} /> Stock Search
                    </NavItem>
                {user.username? 
                <NavItem> <UserOutlined/> {user.username} </NavItem>
                : null }
                {user.username? 
                <NavItem onClick={logoutClick}> <NavLink style={{backgroundColor: '#37474f', padding: '5px', borderRadius: '3px'}} href='/'>logout</NavLink> </NavItem>
                :<NavItem>
                    <NavLink style={{backgroundColor: '#37474f', padding: '5px', borderRadius: '3px'}} href='/login'>login</NavLink>
                    <NavLink style={{backgroundColor: '#37474f', padding: '5px', borderRadius: '3px', marginLeft: '5px'}} href='/register'>register</NavLink>
                </NavItem> }
        </NavDiv>
        <div style={{position: 'relative', top: '20vh', left: '10vw'}} >
                    
             </div>
            
        </div>
    )
}

export default Navbar

