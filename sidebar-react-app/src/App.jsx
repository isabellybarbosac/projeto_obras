import { Layout } from 'antd';
import { Outlet } from 'react-router-dom'; 
import MenuList from './components/MenuList';
import Links from './components/Links';
const { Sider, Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className="sidebar" width={200}>
        <MenuList />
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {/* Você pode adicionar um título, logo ou ícones aqui */}
        </Header>
        <Content style={{ margin: '16px', padding: '16px', background: '#fff' }}>
          <Outlet /> {/* Aqui será renderizado o conteúdo das rotas */}
        </Content>
        <Links/>
      </Layout>
    </Layout>
  );
}

export default App;
