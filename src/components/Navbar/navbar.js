import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavDiv, NavItem, NavLink, NavImg } from './navbar.styled'
import { UserOutlined, StockOutlined } from '@ant-design/icons'
import { logoutUser } from '../../Redux/actions/userActions'
import { useHistory } from 'react-router-dom'



const Navbar = (props) => {
    const user = useSelector(state => state.user.credentials)
    const history = useHistory()
    const dispatch = useDispatch()
    const logoutClick = () => {
        setTimeout(() => {             //tries to reload before post request
            dispatch(logoutUser())
          }, 10);
    }

    const [stocks, setStocks] = useState([])


    const userPage = () => {
        if(user.symbols){
            history.push(`/userpage/${user.username}`)
        }else{
            console.log('no symbols found')
        }

    }

    const homePage = () => {
        history.push(`/`)
    }
    
    

    return (
        <div>
            {console.log(stocks)}
            <NavDiv>
                <NavItem onClick={() => homePage()} style={{cursor: 'pointer'}}>
                    {/* <StockOutlined style={{position: 'relative', fontSize: '20px'}} /> Stock Search */}
                    <NavImg src='https://www.flaticon.com/svg/static/icons/svg/3460/3460062.svg' /> Stock Search
                    </NavItem>
                {user.username? 
                // <NavItem> <UserOutlined/> <NavLink href='/userpage' >{user.username}</NavLink> </NavItem>
                <NavItem  > <UserOutlined/> <span onClick={() => userPage()} style={{cursor: 'pointer', textDecoration: 'underline'}} >{user.username}</span> </NavItem>
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

