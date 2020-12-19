import React from 'react';

import {Button, Col, Layout, Menu, message, Row} from 'antd';
import Login from './components/Login';
import Register from './components/Register';
import {getTopGames, logout} from './utils';
import Favorites from './components/Favorites';
import CustomSearch from './components/CustomSearch';
import Home from './components/Home';
import SubMenu from 'antd/lib/menu/SubMenu';

const {Header, Content, Sider} = Layout;

class App extends React.Component {
    state = {
        loggedIn: true,
        topGames: [],

        resources: {
            VIDEO: [],
            STREAM: [],
            CLIP: [],
        }
    }

    customSearchOnSuccess = (data) => {
        console.log(this.state.resources);
        console.log(data);
        this.setState({
            resources: data
        })
        console.log(this.state.resources);
    }

    signinOnSuccess = () => {
        this.setState({
            loggedIn: true
        })
    }

    signoutOnClick = () => {
        logout()
            .then(() => {
                this.setState({
                    loggedIn: false
                })
                message.success(`Successfull signed out`);
            }).catch((err) => {
            message.error(err.message);
        })
    }

    componentDidMount = () => {
        getTopGames()
            .then((data) => {
                this.setState({
                    topGames: data
                })
            })
            .catch((err) => {
                message.error(err.message);
            })
    }

    render = () => (
        <Layout>
            <Header>
                <Row justify="space-between">
                    <Col>
                        {
                            this.state.loggedIn &&
                            <Favorites/>
                        }
                    </Col>
                    <Col>
                        {
                            this.state.loggedIn ?
                                <Button shape="round" onClick={this.signoutOnClick}>
                                    Logout</Button> :
                                (
                                    <>
                                        <Login onSuccess={this.signinOnSuccess}/>
                                        <Register/>
                                    </>
                                )
                        }
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Sider width={300} className="site-layout-background">
                    <CustomSearch onSuccess={this.customSearchOnSuccess}/>
                    <Menu onSelect={() => {
                    }}>
                        <Menu.Item key="Recommendataion">
                            Recommend for you!
                        </Menu.Item>
                        <SubMenu title="submenu1"/>
                        <SubMenu title="submenu2"/>
                        <SubMenu title="submenu3"/>
                        <SubMenu title="Popular Games">
                            {
                                this.state.topGames.map((game) => {
                                    return (
                                        <Menu.Item key={game.id}>
                                            {/* <img
                        alt="Placeholder"
                        src={game.box_art_url.replace('{height}', '40').replace('{width}', '40')}
                        style={{ borderRadius: '50%', marginRight: '20px' }}
                      /> */}
                                            <span>
                        {game.name}
                      </span>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding: '24px'}}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            height: 800,
                            overflow: 'auto'
                        }}
                    >
                        <br/>
                        <Home resources={this.state.resources} loggedIn={this.state.loggedIn}/>
                        <Favorites/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default App;
