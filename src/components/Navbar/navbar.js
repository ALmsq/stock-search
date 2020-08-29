import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavDiv, NavItem, NavLink } from './navbar.styled'
import { UserOutlined, StockOutlined } from '@ant-design/icons'
import { logoutUser } from '../../Redux/actions/authActions'


const Navbar = (props) => {

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const logoutClick = () => {
        setTimeout(() => {             //tries to reload before post request
            dispatch(logoutUser())
          }, 10);
    }
    

    return (
        <div>
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
        </div>
    )
}

export default Navbar

