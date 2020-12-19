import React from 'react';
import { Button, Card, List, Tabs, Tooltip } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const tabKeys = {
    Streams: 'stream',
    Videos: 'videos',
    Clips: 'clips',
}

const processUrl = (url) => url
    .replace('%{height}', '252')
    .replace('%{width}', '480')
    .replace('{height}', '252')
    .replace('{width}', '480');

const renderCardTitle = (item, loggedIn) => {
    const title = `${item.broadcaster_name} - ${item.title}`;

    return (
        <>
            {
                loggedIn &&
                <Tooltip title="Add to favorite list">
                    <Button shape="circle" icon={<StarOutlined />} />
                </Tooltip>
            }
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 450 }}>
                <Tooltip title={title}>
                    <span>{title}</span>
                </Tooltip>
            </div>
        </>
    )
}

const renderCardGrid = (data, loggedIn) => {
    return (
        <List
            grid={{
                xs: 1,  // 屏幕极小 显示一个
                sm: 2,  // small 2个
                md: 4,
                lg: 4,
                xl: 6,
            }}
            // data 和 item 是 list的props, 查 antdeisgn 的 doc
            // item 是 data 中的一个个 entry
            dataSource={data}
            renderItem={item => (
                <List.Item style={{ marginRight: '20px' }}>
                    <Card
                        title={renderCardTitle(item, loggedIn)  }
                    >
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <img
                                alt="Placeholder"
                                src={processUrl(item.thumbnail_url)}
                            />
                        </a>
                    </Card>
                </List.Item>
            )}
        />
    )
}

// { resources, loggedIn } 是在解构 props
// 没有解构的话直接 传入 props 也行
const Home = ({ resources, loggedIn }) => {
    const {VIDEO, STREAM, CLIP} = resources;
    return (
        <Tabs style = {{marginTop: '60px'}, {marginBottom: '20px'},  {height: '300px'}}>
            <TabPane key={tabKeys.Streams} tab="Streams" forceRender={true}>
                {renderCardGrid(STREAM, loggedIn)}
            </TabPane>
            <TabPane key={tabKeys.Videos} tab="Videos" forceRender={true}>
                {renderCardGrid(VIDEO, loggedIn)}
            </TabPane>
            <TabPane key={tabKeys.Clips} tab="Clip" forceRender={true}>
                {renderCardGrid(CLIP, loggedIn)}
            </TabPane>
        </Tabs>
    )
}

export default Home;




