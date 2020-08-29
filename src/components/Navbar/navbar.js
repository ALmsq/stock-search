import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavDiv, NavItem } from './navbar.styled'
import { UserOutlined } from '@ant-design/icons'
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
        <NavDiv>
            
                {user.username? 
                <NavItem> <UserOutlined/> {user.username} </NavItem>
                : null }
                {user.username? 
                <NavItem onClick={logoutClick}> <a href='/'>logout</a> </NavItem>
                :<NavItem>
                    <a href='/login'>login</a>
                    <a style={{paddingLeft: '5px'}} href='/register'>register</a>
                </NavItem> }
            
        </NavDiv>
    )
}

export default Navbar

