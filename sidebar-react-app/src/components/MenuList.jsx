import { Menu } from 'antd';
import { 
  HomeOutlined, 
  AppstoreOutlined, 
  BarsOutlined,
  TeamOutlined,
  FileOutlined,
  SettingOutlined,
  MailOutlined,
  CalendarOutlined,
  BellOutlined
} from '@ant-design/icons';


const MenuList = () => {
  return (
    <Menu 
      theme="dark" 
      mode="inline" 
      className="menu-bar"
      defaultSelectedKeys={['home']}
      defaultOpenKeys={['tasks']}
    >
      {/* Seção Principal */}
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      
      <Menu.Item key="activity" icon={<AppstoreOutlined />}>
        Activity
      </Menu.Item>
      
      {/* Menu Tasks */}
      <Menu.SubMenu 
        key="tasks" 
        icon={<BarsOutlined />} 
        title="Tasks"
      >
        <Menu.Item key="task-1">Task 1</Menu.Item>
        <Menu.Item key="task-2">Task 2</Menu.Item>
        
        <Menu.SubMenu key="subscribe" title="Subscribe" icon={<MailOutlined />}>
          <Menu.Item key="sub-1">Basic Plan</Menu.Item>
          <Menu.Item key="sub-2">Pro Plan</Menu.Item>
          <Menu.Item key="sub-3">Enterprise</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>

      {/* Menu Team */}
      <Menu.SubMenu 
        key="team" 
        icon={<TeamOutlined />} 
        title="Team Management"
      >
        <Menu.Item key="team-members">Members</Menu.Item>
        <Menu.Item key="team-roles">Roles</Menu.Item>
        <Menu.Item key="team-permissions">Permissions</Menu.Item>
      </Menu.SubMenu>

      {/* Menu Documents */}
      <Menu.SubMenu 
        key="documents" 
        icon={<FileOutlined />} 
        title="Documents"
      >
        <Menu.Item key="doc-templates">Templates</Menu.Item>
        <Menu.Item key="doc-archive">Archive</Menu.Item>
      </Menu.SubMenu>

      {/* Menu Notifications */}
      <Menu.Item key="notifications" icon={<BellOutlined />}>
        Notifications
        <span className="notification-badge"></span>
      </Menu.Item>

      {/* Menu Calendar */}
      <Menu.Item key="calendar" icon={<CalendarOutlined />}>
        Calendar
      </Menu.Item>

      {/* Menu Settings */}
      <Menu.SubMenu 
        key="settings" 
        icon={<SettingOutlined />} 
        title="Settings"
      >
        <Menu.Item key="settings-account">Account</Menu.Item>
        <Menu.Item key="settings-privacy">Privacy</Menu.Item>
        <Menu.Item key="settings-theme">Theme</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default MenuList;