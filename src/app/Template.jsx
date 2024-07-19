"use client"  
import React, { Children, useState } from 'react';
import { useRouter } from 'next/navigation'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
  StockOutlined,
  DatabaseOutlined ,
  BarChartOutlined ,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme ,Avatar,Dropdown,message,Space} from 'antd';
const { Header, Sider,Footer, Content } = Layout;
const Template = (props) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState("Abdelmounaim Elhaddad");
  const [email, setEmail] = useState("a.elhaddad@uca.ac.ma");
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const handleButtonClick = (e) => {
    message.info(user.slice(0,2));
    console.log('click left button', e);
  };

  const items = [
    {
      label: email,
      key: 'email',
      disabled:false
   
    },
    {
      label: 'Deconexion',
      key: '/',
   
    },
    
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const MenuItems = [
    {
      key: '/home',
      icon: <HomeOutlined  />,
      label: 'Home',
    },
    {
      key: '/upload',
      icon: <UploadOutlined />,
      label: 'Upload',
    },
    {
      key: '',
      icon : <StockOutlined/>,
      label: 'Catalyst',
      children:[
        {
          key:"/catalyst/data",
          label :"Data",
          icon : <DatabaseOutlined />
        },
        {
          key:"/catalyst/stats",
          label :"Stats",
          icon : <BarChartOutlined />
        }
      ]
    },
  ]
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={MenuItems}
          onClick={(value)=>{  router.push(value.key,{scroll:false})}}
        />
      </Sider>
      <Layout>
        <Header
        className='flex justify-between'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
          className=''
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
            <Dropdown menu={{ items }} placement="bottom" className="cursor-pointer me-10 mt-2 "  onClick={event => console.log(event)} >
                <Avatar className=' ' style={{ backgroundColor: "#f56a00",verticalAlign: 'middle',}} size="large" gap={4} > {user.slice(0,2)} </Avatar>
            </Dropdown>
          
            
            {/* <Dropdown.Button menu={menuProps}  icon={< UserOutlined/>}> a.elhaddad@uca.ac.ma </Dropdown.Button> */}
        </Header>
        <Content
        className="overflow-y-scroll "
          style={{
            margin: '24px 16px',
            padding: 24,
            // minHeight: 780,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: 'calc(100vh - 11.3rem)'
          }}
        >
          {
            props.Contents
          }
        
        </Content>

       <Footer
          style={{
            textAlign: 'center',
          }}
        >
         CiLC UCAM ©{new Date().getFullYear()} Created by CiLC Team
        </Footer> 

      </Layout>
    </Layout>
  );
};
export default Template;