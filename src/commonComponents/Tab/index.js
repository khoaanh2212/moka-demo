import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const CustomTab = ({}) => (
  <Tabs defaultActiveKey={1}>
    <Tab eventKey={1} title="GENERAL INFO">
      <General />
    </Tab>
    <Tab eventKey={2} title="INVENTORY">Tab 2 content</Tab>
    <Tab eventKey={3} title="STOCK">Tab 3 content</Tab>
    <Tab eventKey={4} title="USERS">Tab 3 content</Tab>
    <Tab eventKey={5} title="SETTINGS">Tab 3 content</Tab>
  </Tabs>
);
export default CustomTab;
