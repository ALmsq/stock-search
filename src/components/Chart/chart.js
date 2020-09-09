import React, { useEffect } from 'react'

import TradingViewWidget from 'react-tradingview-widget'
// import { Row, Col } from 'antd'
import { Wrapper } from './chart.styled'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Profile from './profile'
import { useSelector, useDispatch } from 'react-redux'
import {PlusCircleOutlined} from '@ant-design/icons'
import axios from 'axios'



const Chart = () => {
    const stock = useSelector(state => state.stock.stock)
    const user = useSelector(state => state.auth.user)
    
    const dispatch = useDispatch()
    const handleClick = () => {
        axios.put(`http://localhost:5000/api/users/stocks/${user.id}`, {
                stocks: stock
            })
            .then((res) =>{
                console.log(res)
            })
            .catch((err) =>{
                console.log(err)
            })
    }
    

    useEffect(() => {
        console.log(stock)
    })

    return(
        <div>
            
        <Wrapper>
        <Row style={{textAlign: 'center'}}>
        
        <Col xs> 
        <TradingViewWidget
            symbol={stock}
            height='470vh'
            width='auto'/> 
        </Col>
        <Col style={{position: 'relative'}} xs={4} > 
        
        
        <Profile />

        </Col>
        </Row>
            
        </Wrapper>
            <div>
            <PlusCircleOutlined onClick={handleClick} style={{fontSize: '26px', cursor:'pointer'}} /> Add to list
            </div>
        </div>
        
    )
}

export default Chart