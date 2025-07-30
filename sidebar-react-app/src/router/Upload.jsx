import React, { useState, useEffect } from 'react';
import { InboxOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { message, Input, Tooltip, Checkbox } from 'antd';

const UploadPDF = () => {
  const [pdfList, setPdfList] = useState([]);
  const [mostrarSelecao, setMostrarSelecao] = useState(false);
  const [nomeSelecao, setNomeSelecao] = useState(() => {
    return localStorage.getItem('nomeSelecao') || '';
  });
  const [selecoesSalvas, setSelecoesSalvas] = useState(() => {
    const saved = localStorage.getItem('selecoesSalvas');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nomeSelecao', nomeSelecao);
    localStorage.setItem('selecoesSalvas', JSON.stringify(selecoesSalvas));
  }, [nomeSelecao, selecoesSalvas]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const newPDFs = files
      .filter(file => file.type === 'application/pdf')
      .map(file => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        templateName: '',
        description: ''
      }));

    if (newPDFs.length !== files.length) {
      message.warning('Apenas arquivos PDF foram adicionados.');
    }

    setPdfList(prev => [...prev, ...newPDFs]);
  };

  const handleChange = (index, field, value) => {
    const updatedList = [...pdfList];
    updatedList[index][field] = value;
    setPdfList(updatedList);
  };

  const handleDelete = (index) => {
    setPdfList(prev => prev.filter((_, i) => i !== index));
  };

  const salvarSelecao = () => {
    if (!nomeSelecao.trim()) {
      message.warning('Por favor, insira um nome para a seleção');
      return;
    }

    const novaSelecao = {
      titulo: nomeSelecao,
      data: new Date().toLocaleDateString(),
      selecionado: false
    };

    setSelecoesSalvas(prev => [...prev, novaSelecao]);
    setNomeSelecao('');
    setMostrarSelecao(false);
    message.success('Seleção salva com sucesso!');
  };

  const toggleSelecionado = (index) => {
    const updatedSelecoes = [...selecoesSalvas];
    updatedSelecoes[index].selecionado = !updatedSelecoes[index].selecionado;
    setSelecoesSalvas(updatedSelecoes);
  };

  const deletarSelecao = (index, e) => {
    e.stopPropagation();
    const novasSelecoes = selecoesSalvas.filter((_, i) => i !== index);
    setSelecoesSalvas(novasSelecoes);
    message.success('Seleção removida com sucesso!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1300px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#333', textAlign: 'center' }}>
        Upload e Visualização de Templates
      </h2>

      <label
        htmlFor="pdf-upload"
        style={{
          border: '2px dashed #1890ff',
          padding: '40px',
          textAlign: 'center',
          display: 'block',
          cursor: 'pointer',
          borderRadius: '10px',
          backgroundColor: '#fafafa',
          marginBottom: '40px'
        }}
      >
        <InboxOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
        <p style={{ marginTop: '10px' }}>
          Clique ou arraste um ou mais arquivos PDF para esta área
        </p>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          multiple
        />
      </label>

      {pdfList.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}
        >
          {pdfList.map((pdf, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '16px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                position: 'relative'
              }}
            >
              <iframe
                src={pdf.url}
                title={`PDF-${index}`}
                width="100%"
                height="200px"
                style={{ borderRadius: '8px', border: '1px solid #ccc' }}
              />

              <Input
                placeholder="Nome do Template"
                value={pdf.templateName}
                onChange={(e) => handleChange(index, 'templateName', e.target.value)}
                style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '16px' }}
              />

              {pdf.templateName && (
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '8px',
                    fontSize: '14px',
                    color: '#1E8449',
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                  }}
                >
                  Abrir {pdf.templateName}
                </a>
              )}

              <p style={{ marginTop: '6px', fontSize: '12px', color: '#999' }}>
                {pdf.name} – {pdf.size}
              </p>

              <Input.TextArea
                rows={3}
                placeholder="Descrição do template..."
                value={pdf.description}
                onChange={e => handleChange(index, 'description', e.target.value)}
                style={{ marginTop: '10px' }}
              />

              <Tooltip title="Excluir">
                <DeleteOutlined
                  onClick={() => handleDelete(index)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '18px',
                    color: '#ff4d4f',
                    cursor: 'pointer'
                  }}
                />
              </Tooltip>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          style={{
            backgroundColor: '#1890ff',
            color: 'white',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onClick={() => setMostrarSelecao(prev => !prev)}
        >
          {pdfList.length > 0 ? 'ADICIONAR SELEÇÃO' : 'CAIXA DE SELEÇÃO'}
        </button>

        {mostrarSelecao && (
          <div
            style={{
              marginTop: '30px',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              backgroundColor: '#f9f9f9',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'left',
            }}
          >
            <h3 style={{ marginBottom: '10px', color: '#333' }}>
              Nome da Caixa de Seleção
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Input
                value={nomeSelecao}
                onChange={(e) => setNomeSelecao(e.target.value)}
                style={{ flex: 1 }}
                placeholder="Ex: AOCCHIM SELEÇÃO"
              />
              <button
                onClick={salvarSelecao}
                style={{
                  backgroundColor: '#52c41a',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        )}

        {selecoesSalvas.length > 0 && (
          <div style={{ marginTop: '40px', textAlign: 'left' }}>
            <h3 style={{ marginBottom: '20px', color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              Caixas de Seleção
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selecoesSalvas.map((selecao, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 15px',
                    backgroundColor: selecao.selecionado ? '#f0f9ff' : 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: '0.2s',
                    ':hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                  onClick={() => toggleSelecionado(index)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Checkbox
                      checked={selecao.selecionado}
                      onChange={() => toggleSelecionado(index)}
                      style={{ marginRight: '15px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{selecao.titulo}</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>Criado em: {selecao.data}</div>
                    </div>
                  </div>
                  <Tooltip title="Excluir">
                    <DeleteOutlined
                      onClick={(e) => deletarSelecao(index, e)}
                      style={{
                        fontSize: '16px',
                        color: '#ff4d4f',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '4px',
                        ':hover': {
                          backgroundColor: '#fff2f0'
                        }
                      }}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPDF;