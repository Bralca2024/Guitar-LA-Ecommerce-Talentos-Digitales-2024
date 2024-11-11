import { Route, Routes } from "react-router-dom";

/* Common */
import HeaderNavbar from "./components/common/HeaderNavbar";
import Footer from "./components/common/Footer";
/* Sections */
import Features from "./components/home/Features";
import Offers from "./components/home/Offers";
import AboutUs from "./components/home/AboutUs";
import Blogs from "./components/home/Blogs";
import Testimonials from "./components/home/Testimonials";
/* Pages */
import AboutUsPage from "./components/pages/AboutUsPage";
import ProductsStoragePage from "./components/pages/ProductsStorePage";
import ProductIDetailsPage from "./components/pages/ProductIDetailsPage";
import BlogsPage from "./components/pages/BlogsPage";
import ContactPage from "./components/pages/ContactPage";
/* Dashboard */
import DashboardProducts from "./components/dashboard/DashboardProducts";
/* Auth */
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
/* Utilities */
import ScrollToTop from "./utilities/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <HeaderNavbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Features />
              <AboutUs />
              <Offers />
              <Blogs />
              <Testimonials />
            </>
          }
        />
        <Route path="/about_us" element={<AboutUsPage />} />
        <Route path="/products" element={<ProductsStoragePage />} />
        <Route path="/product/:id" element={<ProductIDetailsPage />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/DashboardProducts" element={<DashboardProducts />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
