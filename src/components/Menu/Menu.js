import React from 'react';
import { StyledMenu } from './Menu.styled';

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <a href="/">
        <span role="img" aria-label="about us"></span>
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
