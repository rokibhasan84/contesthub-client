import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import AllContests from "./Pages/AllContests";
import ContestDetails from "./Pages/ContestDetails/ContestDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgetPassword from "./Components/ForgetPassword";
import ChangePassword from "./Components/ChangePassword";
import NotFound from "./Pages/NotFound";

import PrivateRoute from "./Components/PrivateRoute";
import RequireRole from "./routes/RequireRole";

// Dashboard
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import MyParticipated from "./Pages/Dashboard/MyParticipated";
import MyWinning from "./Pages/Dashboard/MyWinning";
import MyProfile from "./Pages/Dashboard/MyProfile";
import AddContest from "./Pages/Dashboard/AddContest";
import MyContests from "./Pages/Dashboard/MyContests";
import Submissions from "./Pages/Dashboard/Submissions";
import ManageUsers from "./Pages/Dashboard/ManageUsers";
import ManageContests from "./Pages/Dashboard/ManageContests";
import Leaderboard from "./Pages/Leaderboard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>

          {/* ===== Public Routes ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/all-contests" element={<AllContests />} />
          <Route path="/leaderboard" element={<Leaderboard />}/>

          <Route
            path="/contest/:id"
            element={
              <PrivateRoute>
                <ContestDetails />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route
            path="/change-password"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />

          {/* ===== Dashboard Routes ===== */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            {/* Dashboard Home */}
            <Route index element={<DashboardHome />} />

            {/* User routes */}
            <Route path="participated" element={<MyParticipated />} />
            <Route path="winning" element={<MyWinning />} />
            <Route path="profile" element={<MyProfile />} />

            {/* Creator routes */}
            <Route
              path="add-contest"
              element={
                <RequireRole allowed={["creator", "admin"]}>
                  <AddContest />
                </RequireRole>
              }
            />

            <Route path="my-contests" element={<MyContests />} />
            <Route path="submissions" element={<Submissions />} />

            {/* Admin routes */}
            <Route
              path="manage-users"
              element={
                <RequireRole allowed={["admin"]}>
                  <ManageUsers />
                </RequireRole>
              }
            />

            <Route
              path="manage-contests"
              element={
                <RequireRole allowed={["admin"]}>
                  <ManageContests />
                </RequireRole>
              }
            />
          </Route>

          {/* ===== Not Found ===== */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;