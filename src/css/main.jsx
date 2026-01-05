import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from './components/Router';
import './css/style.css';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
 <StrictMode>
 <Router />
 </StrictMode>
);