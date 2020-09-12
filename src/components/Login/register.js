import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { registerUser } from '../../Redux/actions/authActions'
import { signupUser } from '../../Redux/actions/userActions'
import { useHistory } from 'react-router-dom'

import { Wrapper } from './Login.styled'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import 'antd/dist/antd.css'



const Register = (props) => {

    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const [registration, setRegistration] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    })

    const onChange = e => {
        setRegistration({ ...registration, [e.target.name]: e.target.value})
        console.log(registration)
      }

    const history = useHistory()
    const onFinish = values => {
        console.log('Success:', values);
        console.log(values.password)
        console.log(values.username)
        let newUserData = registration
        dispatch(signupUser(newUserData, history))
        // history.push('/login')
      };

    // useEffect(() => {
    //     if(auth.isAuthenticated){
    //         history.push('/')
    //         window.location.reload() // refresh body = hidden to enable scroll
    //     }
    // })

    const { email, username, password, confirmPassword  } = registration
    
    return (
        <Wrapper>
            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                  onFinish={onFinish} 
                                >
                                <Form.Item
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input name="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                                </Form.Item>
                                <Form.Item
                                    name="username"
                                    value={username}
                                    onChange={onChange}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input name="username" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input
                                    name='password'
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChange}
                                    rules={[{ required: true, message: 'Please confirm your Password!' }]}
                                >
                                    <Input
                                    name='confirmPassword'
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Confirm Password"
                                    />
                                </Form.Item>
                                
                                

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                    Register
                                    </Button>
                                    <div style={{ color: 'white', marginTop: '10px'}}>
                                        Already have an account? <a href='/login' >Log in</a>
                                    </div>
                                    
                                </Form.Item>
            </Form>            
        </Wrapper>
    )
}

export default Register

