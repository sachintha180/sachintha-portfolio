import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
