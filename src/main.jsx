import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ProtectedContainer } from './components/index.js';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AddPost, AllPost, EditPost, Home, Post, SignInPage, SignUpPage } from './pages/pagesIndex.js';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="login" element={
      <ProtectedContainer authentication={false}><SignInPage /></ProtectedContainer>
    } />
    <Route path="signup" element={
      <ProtectedContainer authentication={false}><SignUpPage /></ProtectedContainer>
    } />
    <Route path="all-post" element={<ProtectedContainer authentication={true}><AllPost /></ProtectedContainer>} />
    <Route path="add-post" element={<ProtectedContainer authentication={true}><AddPost /></ProtectedContainer>} />
    <Route path="edit-post/:slug" element={<ProtectedContainer authentication={true}><EditPost /></ProtectedContainer>} />
    <Route path="post/:slug" element={<ProtectedContainer authentication={true}><Post /></ProtectedContainer>} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
