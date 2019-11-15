import React from 'react';
// import Logo from '../Logo/Logo'
import  './navbar.css';
import {NavLink} from 'react-router-dom';


const navBar = () => (
<div>
    <nav>
    <ul>

    {/* <div><Logo/></div> */}

                         <li><NavLink
                                to="/"
                                exact={true}
                                activeClassName="is-active link"
                                activeStyle={{
                                    textDecoration: 'underline',
                                    color: 'white',
                                    backgroundColor:'#1f7d4f',
                                    borderBottom: '4px solid #c9b624',
                                    fontWeight:'bold',
                                    fontSize:'1em'
                                }}>Home</NavLink></li>

                            <li><NavLink to={{
                                pathname: '/hospital',
                                activeClassName:"link",
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}
                            activeStyle={{
                                textDecoration: 'underline',
                                color: 'white',
                                backgroundColor:'#1f7d4f',
                                borderBottom: '4px solid #c9b624',
                                fontWeight:'bold'
                            }}>HOSPITALS</NavLink></li>

                            <li><NavLink to={{
                                pathname: '/sign',
                                activeClassName:"link",
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}
                            activeStyle={{
                                textDecoration: 'underline',
                                color: 'white',
                                backgroundColor:'#1f7d4f',
                                borderBottom: '4px solid #c9b624',
                                fontWeight:'bold'
                            }}>REGISTER</NavLink></li>

                            <li><NavLink to={{
                                pathname: '/login',
                                activeClassName:"link",
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}
                            activeStyle={{
                                textDecoration: 'underline',
                                color: 'white',
                                backgroundColor:'#1f7d4f',
                                borderBottom: '4px solid #c9b624',
                                fontWeight:'bold',
                            }}>LOG IN</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/hospital_sign',
                                activeClassName:"link",
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}
                            activeStyle={{
                                textDecoration: 'underline',
                                color: 'white',
                                backgroundColor:'#1f7d4f',
                                borderBottom: '4px solid #c9b624',
                                fontWeight:'bold',
                            }}>Regiter Hospital</NavLink></li>

    </ul>
    </nav>
    </div>
    );
export default navBar;