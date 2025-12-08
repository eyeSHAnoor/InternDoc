import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { PrivateRoute, PublicRoute } from "./components/Routes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import Admins from "./pages/Admins";

function App() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>

              {/* Login WITHOUT layout */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>} />

              {/* Dashboard WITH layout */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/products"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Products />
                    </Layout>
                  </PrivateRoute>
                }
              />

              {/* Users WITH layout */}
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Users />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/admins"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Admins />
                    </Layout>
                  </PrivateRoute>
                }
              />

            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
