import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Redux/actions/authActions'
import { useHistory } from 'react-router-dom'

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Wrapper } from './Login.styled'
import 'antd/dist/antd.css'
import './login.css'

const Login = (props) => {

    const user = useSelector(state => state.auth.user )
    const auth = useSelector(state => state.auth)
    const errors = useSelector(state => state.errors)

    const dispatch = useDispatch()
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const onChange = e => {
        setLogin({ ...login, [e.target.name]: e.target.value})
        console.log(login)
    }


    const history = useHistory()
    const onFinish = values => {
            setTimeout(() => {             //tries to reload before post request
              dispatch(loginUser(login))
            if(auth.isAuthenticated){
            history.push('/')}
            }, 10);
      };

      useEffect(() => {
        if(auth.isAuthenticated){
            history.push('/')
            window.location.reload() // refresh body = hidden to enable scroll
        }else if(errors.usernamenotfound){
            alert(errors.usernamenotfound)
        }
      }, [errors, auth, history])

      const {username, password} = login
    
      return (
        <Wrapper>
            <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            style={{paddingBottom: '10px'}}
            name="username"
            value={username}
            onChange={onChange}
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input name='username' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            style={{paddingBottom: '20px'}}
            name="password"
            value={password}
            onChange={onChange}
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              name='password'
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          
    
          <Form.Item  style={{color: 'white'}}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <div style={{marginTop: '10px'}}>
            Don't have an account? <a href='/register' >Register</a>
            </div>
          </Form.Item>
        </Form>
        </Wrapper>
      );
    
}

export default Login

