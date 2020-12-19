import React from 'react';
import { Menu, Button, Drawer, message } from 'antd';
import { EyeOutlined, YoutubeOutlined, VideoCameraOutlined, StarFilled } from '@ant-design/icons';
import { getFavoriteItem } from '../utils';

const { SubMenu } = Menu;

const MenuKey = {
  Streams: 'streams',
  Videos: 'videos',
  Clips: 'clips'
}

class Favorite extends React.Component {
  state = {
    displayDrawer: false,
    data: {
        VIDEO: [],
        STREAM: [],
        CLIP: []
    }
  }

  onDrawerClose = () => {
    this.setState({
      displayDrawer : false,
    })
  }

  onFavoriteClick = () => {
    getFavoriteItem()
    .then(
      (data) => { // data is favorite item list returned from backend
        console.log(data);
        this.setState({
          data,
          displayDrawer: true
          
        })
      }
    ).catch((err) => {
      message.error(err.message);
    })
  }

  render = () => {
    const { VIDEO, STREAM, CLIP } = this.state.data;

    return (
      <>
        <Button type = "primary" shape = "round" style = {{marginTop: '20px'}}
          icon={<StarFilled />}
          onClick = {this.onFavoriteClick}
        > My Favorite </Button>
        <Drawer title = "My Favorite" placement = "right" width = {720} 
          visible = {this.state.displayDrawer}
          onClose={this.onDrawerClose}
        >
          <div>  item 1 </div>
          <div>  item 2 </div>
          <div>  item 3 </div>
        </Drawer>
        <Menu style = { {height: '100%', marginTop: '60px'}}>
            menu
            <SubMenu key = {MenuKey.Streams} title="Stream" icon = {<EyeOutlined />} style = { {marginTop: '20px'}}>
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              {
                
                STREAM.map((item) => {
                  return (
                    <Menu.Item key={item.id}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {`${item.broadcaster_name} - ${item.title}`}
                      </a>
                    </Menu.Item>
                  )
                })
              }
            </SubMenu>
            <SubMenu key = {MenuKey.Videos} title="Video" icon = {<EyeOutlined />} style = { {marginTop: '20px'}}>
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              {
                VIDEO.map((item) => {
                  return (
                    <Menu.Item key={item.id}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {`${item.broadcaster_name} - ${item.title}`}
                      </a>
                    </Menu.Item>
                  )
                })
              }
            </SubMenu>
            <SubMenu key = {MenuKey.CLIP} title="Clip" icon = {<EyeOutlined />} style = { {marginTop: '20px'}}>
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              {
                CLIP.map((item) => {
                  return (
                    <Menu.Item key={item.id}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {`${item.broadcaster_name} - ${item.title}`}
                      </a>
                    </Menu.Item>
                  )
                })
              }
            </SubMenu>
        </Menu>

          
      </>
    )
  }
}
export default Favorite;