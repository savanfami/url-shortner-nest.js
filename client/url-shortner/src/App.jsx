import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/common/Login";
import SignUp from "./pages/common/SignUp";
import HomePageProtect from "./routes/HomePageProtected";
import LoginAndRegistrationProtoect from "./routes/LoginandRegistrationProtect";
import HomePage from "./layout/HomePageLayout";
import GetUrl from "./pages/user/GetUrl";
import  { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/shortUrl/:id" element={<GetUrl />} />

        <Route element={<HomePageProtect />}>
          <Route path="/" element={<HomePage />}></Route>
        </Route>
        <Route element={<LoginAndRegistrationProtoect />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
