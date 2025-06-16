import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Board from '../views/pages/Board';
import Historico from '../views/pages/Historico';
import Clientes from '../views/pages/Clientes';
import Produtos from '../views/pages/Produtos';
import Relatorios from '../views/pages/Relatorios';
import Configuracoes from '../views/pages/Configuracoes';
import Login from '../views/pages/Login';
import PrivateRoute from './PrivateRoute';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route element={<PrivateRoute />}>
      <Route path="/board" element={<Board />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
