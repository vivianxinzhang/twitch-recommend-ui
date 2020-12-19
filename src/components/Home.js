import React from 'react';
import { Button, Card, List, Tabs, Tooltip } from 'antd';

const {TabPane} = Tabs;

const tabKeys = {
    Streams: 'streams',
    Videos: 'videos',
    Clips: 'clips'
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
                    <Button shape="circle" />
                </Tooltip>
            }
            <div>
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
            // grid={{
            //     xs: 1,
            //     sm: 2,
            //     md: 4,
            //     lg: 4,
            //     xl: 6,
            // }}
            dataSource={data}
            renderItem={item => (
                <List.Item style={{ marginRight: '20px' }}>
                    <Card
                        // title={renderCardTitle(item, loggedIn)}
                        title="title"
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


const Home = (resources, loggedIn) => {
    const {VIDEO, STREAM, CLIP} = resources;
    return (
        <Tabs style = {{marginTop: '60px'}, {marginBottom: '20px'},  {height: '300px'}}>
            <TabPane key={tabKeys.Streams} tab="Streams">
                display stream card
                {renderCardGrid(STREAM, loggedIn)}
            </TabPane>
            <TabPane key={tabKeys.Videos} tab="Videos">
                display video card
                {renderCardGrid(VIDEO, loggedIn)}
            </TabPane>
            <TabPane key={tabKeys.Clips} tab="Clip">
                display clip card
                {renderCardGrid(CLIP, loggedIn)}
            </TabPane>
        </Tabs>
    )
}



export default Home;