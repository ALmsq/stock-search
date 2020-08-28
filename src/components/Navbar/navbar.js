import React from 'react'
import { NavDiv, NavItem } from './navbar.styled'
import { UserOutlined } from '@ant-design/icons'


const navbar = (props) => {
    return (
        <NavDiv>
            
                <NavItem> <UserOutlined/> yo </NavItem>
                <NavItem> login register</NavItem>
            
        </NavDiv>
    )
}

export default navbar

