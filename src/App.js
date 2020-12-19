import React from 'react';
 
import { Button, Col, Layout, message, Row } from 'antd';
import Login from './components/Login';
import Register from './components/Register';
import { logout } from './utils';
import Favorites from './components/Favorites';
import CustomSearch from './components/CustomSearch';

const { Header, Content, Sider } = Layout;
 
class App extends React.Component {
  state = {
    loggedIn: true
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

  render = () => (
    <Layout>
      <Header>
        <Row justify = "space-between"> 
            <Col>
              {
                this.state.loggedIn &&
                <Favorites />
              }
            </Col>
            <Col>
              {
                this.state.loggedIn ? 
                <Button shape="round" onClick={this.signoutOnClick}>
                  Logout</Button> :
                (
                  <>
                    <Login onSuccess={this.signinOnSuccess} />
                    <Register />
                  </>
                )
              }
            </Col>
          </Row>
      </Header>
      <Layout>
        <Sider width={300} className="site-layout-background">
          <CustomSearch />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: 800,
              overflow: 'auto'
            }}
          >
            {'Home'
            } 
            <br/>
            <Favorites />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

//   render = () => (
//     <Layout>
//       <Header>
//         {
//           this.state.loggedIn ? 
//           <Button shape="round" onClick={this.signoutOnClick}>
//             Logout</Button> :
//           (
//             <>
//               <Login onSuccess={this.signinOnSuccess} />
//               <Register />
//             </>
//           )
//         }
//       </Header>
//       <Layout>
//         <Sider width={300} className="site-layout-background">
//           {'Sider'}
//         </Sider>
//         <Layout style={{ padding: '24px' }}>
//           <Content
//             className="site-layout-background"
//             style={{
//               padding: 24,
//               margin: 0,
//               height: 800,
//               overflow: 'auto'
//             }}
//           >
//             {'Home'} 
//           </Content>
//         </Layout>
//       </Layout>
//     </Layout>
//   )
// }

//   render = () => (
//     <Layout>
//       <Header>
//         {'Header'}
//       </Header>
//       <Layout>
//         <Sider width={300} className="site-layout-background">
//           {'Sider'}
//         </Sider>
//         <Layout style={{ padding: '24px' }}>
//           <Content
//             className="site-layout-background"
//             style={{
//               padding: 24,
//               margin: 0,
//               height: 800,
//               overflow: 'auto'
//             }}
//           >
//             {'Home'} 
//           </Content>
//         </Layout>
//       </Layout>
//     </Layout>
//   )
// }
 
export default App;
