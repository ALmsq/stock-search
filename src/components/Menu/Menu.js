import React from 'react'
import { useSelector } from 'react-redux'
import { StyledMenu } from './Menu.styled';

const Menu = ({ open }) => {

  const user = useSelector(state => state.user.credentials)
  return (
    <StyledMenu open={open}>
      {user.username ? <a href="/userpage">
        <span role="img" aria-label="about us">💻</span>
        {user.username}'s Page
      </a> : null}
      <a href="/">
        <span role="img" aria-label="about us">🏠</span>
        Home
      </a>
      <a href="/chart">
        <span role="img" aria-label="price">📈</span>
        Chart
        </a>
    </StyledMenu>
  )
}
export default Menu;
