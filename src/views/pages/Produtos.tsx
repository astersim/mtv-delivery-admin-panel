import React, { useState } from 'react';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  imagem?: string; // URL ou base64 da imagem
}

const categorias = ['Lanches', 'Pizzas', 'Bebidas', 'Acompanhamentos', 'Sobremesas'];

const produtosMockInicial: Produto[] = [
  { id: 1, nome: 'Hambúrguer Clássico', preco: 24.9, categoria: 'Lanches', imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop&crop=center' },
  { id: 2, nome: 'Pizza Margherita', preco: 39.9, categoria: 'Pizzas', imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop&crop=center' },
  { id: 3, nome: 'Refrigerante Lata', preco: 6.5, categoria: 'Bebidas', imagem: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=100&h=100&fit=crop&crop=center' },
  { id: 4, nome: 'Batata Frita', preco: 12.0, categoria: 'Acompanhamentos', imagem: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=100&h=100&fit=crop&crop=center' },
];

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>(produtosMockInicial);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<number | null>(null);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState<number | null>(null);
  // Estados do formulário para novo produto
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('Lanches');
  const [imagem, setImagem] = useState('');
  const [imagemPreview, setImagemPreview] = useState('');
  // Estados para edição inline
  const [nomeEditando, setNomeEditando] = useState('');
  const [precoEditando, setPrecoEditando] = useState('');
  const [categoriaEditando, setCategoriaEditando] = useState('');
  const [imagemEditando, setImagemEditando] = useState('');
  const [imagemPreviewEditando, setImagemPreviewEditando] = useState('');
  // Função para abrir modal de novo produto
  const abrirModalNovo = () => {
    setNome('');
    setPreco('');
    setCategoria('Lanches');
    setImagem('');
    setImagemPreview('');
    setModalAberto(true);
  };
  // Função para iniciar edição inline
  const iniciarEdicao = (produto: Produto) => {
    setProdutoEditando(produto.id);
    setNomeEditando(produto.nome);
    setPrecoEditando(produto.preco.toString());
    setCategoriaEditando(produto.categoria);
    setImagemEditando(produto.imagem || '');
    setImagemPreviewEditando(produto.imagem || '');
  };
  // Função para cancelar edição inline
  const cancelarEdicao = () => {
    setProdutoEditando(null);
    setNomeEditando('');
    setPrecoEditando('');
    setCategoriaEditando('');
    setImagemEditando('');
    setImagemPreviewEditando('');
  };
  // Função para salvar edição inline
  const salvarEdicao = (id: number) => {
    if (!nomeEditando.trim() || !precoEditando.trim()) {
      alert('Nome e preço são obrigatórios!');
      return;
    }

    const precoNumerico = parseFloat(precoEditando);
    if (isNaN(precoNumerico) || precoNumerico <= 0) {
      alert('Preço deve ser um número válido maior que zero!');
      return;
    }

    setProdutos(produtos.map(p => 
      p.id === id 
        ? { ...p, nome: nomeEditando.trim(), preco: precoNumerico, categoria: categoriaEditando, imagem: imagemEditando || undefined }
        : p
    ));

    cancelarEdicao();
  };
  // Função para fechar modal
  const fecharModal = () => {
    setModalAberto(false);
    setNome('');
    setPreco('');
    setCategoria('Lanches');
    setImagem('');
    setImagemPreview('');
  };  // Função para lidar com upload de imagem durante edição
  const handleImageUploadEdicao = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setImagemEditando(base64String);
        setImagemPreviewEditando(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para remover imagem durante edição
  const removerImagemEdicao = () => {
    setImagemEditando('');
    setImagemPreviewEditando('');
  };

  // Função para lidar com upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setImagem(base64String);
        setImagemPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para remover imagem
  const removerImagem = () => {
    setImagem('');
    setImagemPreview('');
  };

  // Função para salvar novo produto
  const salvarNovoProduto = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim() || !preco.trim()) {
      alert('Nome e preço são obrigatórios!');
      return;
    }

    const precoNumerico = parseFloat(preco);
    if (isNaN(precoNumerico) || precoNumerico <= 0) {
      alert('Preço deve ser um número válido maior que zero!');
      return;
    }

    const novoId = Math.max(...produtos.map(p => p.id)) + 1;
    const novoProduto: Produto = {
      id: novoId,
      nome: nome.trim(),
      preco: precoNumerico,
      categoria,
      imagem: imagem || undefined
    };
    setProdutos([...produtos, novoProduto]);

    fecharModal();
  };

  // Função para confirmar exclusão
  const confirmarExclusao = (id: number) => {
    setConfirmandoExclusao(id);
  };

  // Função para excluir produto
  const excluirProduto = (id: number) => {
    setProdutos(produtos.filter(p => p.id !== id));
    setConfirmandoExclusao(null);
  };

  // Função para cancelar exclusão
  const cancelarExclusao = () => {
    setConfirmandoExclusao(null);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-5xl p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-8 flex items-center gap-3 justify-center">
          <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4" />
            </svg>
          </span>
          Produtos / Cardápio
        </h1>
        
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600 dark:text-gray-400">
            Total: <span className="font-bold text-blue-700 dark:text-blue-400">{produtos.length}</span> produtos
          </div>
          <button 
            onClick={abrirModalNovo}
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <span className="text-xl">+</span> Novo Produto
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 uppercase text-xs tracking-wider">
                <th className="py-4 px-6 text-left font-bold">Produto</th>
                <th className="py-4 px-6 text-left font-bold">Categoria</th>
                <th className="py-4 px-6 text-left font-bold">Preço</th>
                <th className="py-4 px-6 text-center font-bold">Ações</th>
              </tr>
            </thead>            <tbody>
              {produtos.map(produto => (
                <tr key={produto.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition group">                  <td className="py-4 px-6 font-medium">                    {produtoEditando === produto.id ? (                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          {imagemPreviewEditando ? (
                            <div className="relative">
                              <img 
                                src={imagemPreviewEditando} 
                                alt="Preview"
                                className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700 produto-imagem"
                              />
                              <button
                                type="button"
                                onClick={removerImagemEdicao}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600 transition"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span className="flex w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 items-center justify-center font-bold text-lg">
                              {produto.nome[0].toUpperCase()}
                            </span>
                          )}
                          <input
                            type="text"
                            value={nomeEditando}
                            onChange={(e) => setNomeEditando(e.target.value)}
                            className="flex-1 border border-blue-300 dark:border-blue-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nome do produto"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                            Nova imagem:
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUploadEdicao}
                            className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
                          />
                        </div>
                      </div>
                    ) : (<div className="flex items-center gap-3">
                        {produto.imagem ? (
                          <img 
                            src={produto.imagem} 
                            alt={produto.nome}
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700 produto-imagem"
                          />
                        ) : (
                          <span className="flex w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 items-center justify-center font-bold text-lg">
                            {produto.nome[0].toUpperCase()}
                          </span>
                        )}
                        <span className="text-gray-900 dark:text-gray-100">{produto.nome}</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="py-4 px-6">
                    {produtoEditando === produto.id ? (
                      <select
                        value={categoriaEditando}
                        onChange={(e) => setCategoriaEditando(e.target.value)}
                        className="w-full border border-blue-300 dark:border-blue-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categorias.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">{produto.categoria}</span>
                    )}
                  </td>
                  
                  <td className="py-4 px-6">
                    {produtoEditando === produto.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">R$</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={precoEditando}
                          onChange={(e) => setPrecoEditando(e.target.value)}
                          className="w-24 border border-blue-300 dark:border-blue-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0.00"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-900 dark:text-gray-100 font-semibold">R$ {produto.preco.toFixed(2)}</span>
                    )}
                  </td>
                  
                  <td className="py-4 px-6 text-center align-middle">
                    {confirmandoExclusao === produto.id ? (
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                        <div className="text-red-600 dark:text-red-400 text-sm font-medium mb-2 sm:mb-0">
                          Confirmar exclusão?
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => excluirProduto(produto.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold shadow hover:bg-red-600 transition"
                          >
                            Sim
                          </button>
                          <button 
                            onClick={cancelarExclusao}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-xs font-bold shadow hover:bg-gray-600 transition"
                          >
                            Não
                          </button>
                        </div>
                      </div>
                    ) : produtoEditando === produto.id ? (
                      <div className="flex flex-row items-center justify-center gap-2">
                        <button 
                          onClick={() => salvarEdicao(produto.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xs shadow hover:bg-green-600 transition"
                        >
                          ✓ Salvar
                        </button>
                        <button 
                          onClick={cancelarEdicao}
                          className="bg-gray-500 text-white px-4 py-2 rounded-full font-bold text-xs shadow hover:bg-gray-600 transition"
                        >
                          ✕ Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-row items-center justify-center gap-2">
                        <button 
                          onClick={() => iniciarEdicao(produto)}
                          className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-bold text-xs shadow hover:bg-blue-300 dark:hover:bg-blue-700 transition"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => confirmarExclusao(produto.id)}
                          className="bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-4 py-2 rounded-full font-bold text-xs shadow hover:bg-red-300 dark:hover:bg-red-700 transition"
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {produtos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg">
                Nenhum produto cadastrado ainda.
              </div>
              <button 
                onClick={abrirModalNovo}
                className="mt-4 bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                Adicionar Primeiro Produto
              </button>
            </div>
          )}
        </div>

        {/* Modal de Adicionar/Editar Produto */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  {produtoEditando ? 'Editar Produto' : 'Novo Produto'}
                </h2>
                
                <form onSubmit={salvarNovoProduto} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      Nome do Produto
                    </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Hambúrguer Especial"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      Categoria
                    </label>
                    <select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      Preço (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 25.90"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      Imagem do Produto
                    </label>
                      {imagemPreview ? (
                      <div className="mb-3">
                        <div className="preview-imagem">
                          <img 
                            src={imagemPreview} 
                            alt="Preview" 
                            className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                          />
                          <button
                            type="button"
                            onClick={removerImagem}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ) : null}
                    
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={fecharModal}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                    >
                      {produtoEditando ? 'Salvar Alterações' : 'Adicionar Produto'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Produtos;
