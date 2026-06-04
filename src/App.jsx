import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import MyAccount from './pages/MyAccount';
import ChangePassword from "./pages/ChangePassword";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/post/:id"
          element={<PostDetails />}
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myaccount"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path='/myaccount/changepassword/:id'
          element={<ChangePassword />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;