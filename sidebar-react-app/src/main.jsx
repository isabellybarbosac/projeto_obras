import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import "./index.css"
//1 - Configurando o React Router
import{
createBrowserRouter, RouterProvider
} from 'react-router-dom'
import Upload from './router/Upload.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Um layout base com menu, header, etc
    children: [
      {
        path: "/Upload", // acessível em /upload
        element: <Upload />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <RouterProvider router={router}/>
 </React.StrictMode>
);
