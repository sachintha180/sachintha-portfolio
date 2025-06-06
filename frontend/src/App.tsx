import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
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
