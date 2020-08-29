import React, { useEffect } from 'react'
import TradingViewWidget from 'react-tradingview-widget'
// import { Row, Col } from 'antd'
import { Wrapper } from './chart.styled'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Profile from './profile'
import { useSelector } from 'react-redux'



const Chart = () => {

    const stock = useSelector(state => state.stock.stock)
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
        </div>
        
    )
}

export default Chart