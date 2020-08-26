import React from 'react'
import TradingViewWidget from 'react-tradingview-widget'
// import { Row, Col } from 'antd'
import { Wrapper } from './chart.styled'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Profile from './profile'

const Chart = () => {
    

    return(
        <div>
        <Wrapper>
        <Row style={{textAlign: 'center'}}>
        
        <Col xs> 
        <TradingViewWidget
            symbol="NASDAQ:TSLA"
            height='470vh'
            width='auto'/> 
        </Col>
        <Col style={{position: 'relative'}} xs={4} > 
        
        
        <Profile/>

        </Col>
        </Row>
            
        </Wrapper>
        </div>
        
    )
}

export default Chart