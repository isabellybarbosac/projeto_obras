import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const CriarTemplateButton = () => {
  return (
    <Link to="/upload">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{
          backgroundColor: '#3f51b5', // Azul estilo Material Design
          border: 'none',
          borderRadius: '40px',
          fontWeight: 'bold',
          padding: '0 24px',
          height: '48px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        CRIAR TEMPLATE
      </Button>
    </Link>
  );
};

export default CriarTemplateButton;
