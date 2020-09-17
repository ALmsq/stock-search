import styled from 'styled-components'

export const NavDiv = styled.div `
    position: absolute;
    
    top: 11%;
    width : 60%;
    height: 40px;
    overflow: hidden;
    right: 20px;
    display: flex;
    justify-content: space-around;
    box-shadow: 0 2px 0 #22bde2;
`
export const NavItem = styled.div`
    margin-top: 5px;
    font-size: 14px; 
`
export const NavLink = styled.a`
    background-color: '#37474f';
    padding: '5px';
    margin-left: 10px;
    border-radius: '3px';
    box-shadow: 0 2px 0 #22bde2;
`
export const NavImg = styled.img`
    height: 35px;
    width: 35px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    box-shadow: 0 2px 0 #22bde2;
    border: 2px solid black;
`
