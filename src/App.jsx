import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  AdminPage  from "./components/shop/AdminPage.jsx";
import  AboutUsForm  from './components/Aboutus/AboutUsForm.jsx';
import { ManageAboutUs } from './components/Aboutus/ManageAboutUs.jsx';
import SidebarMainLayout from './components/shop/SidebarMaiLayout.jsx';
import { ManageManagementTeam } from './components/ManagementTeam/ManageTeam.jsx';
import { ManagementForm } from './components/ManagementTeam/ManagementForm.jsx';
import { CertificatesForm } from './components/Certificates/CertificateForm.jsx';
import { ManageCertificates } from './components/Certificates/CertificatesManage.jsx';
import { ClientManage } from './components/clients/ClientMange.jsx';
import { ClientsForm } from './components/clients/ClientsForm.jsx';
import { ContactUsManage } from './components/Contaus/ContactUsManage.jsx';
import { ContactUsForm } from './components/Contaus/ContactusForm.jsx';
import Product from './components/shop/Product/Product.jsx';
import ProductAdd from './components/Product/ProductAdd.jsx';
import ManageProducts from './components/Product/ManageProduct.jsx';
import { CommunityCreation } from './components/CommunityCreation/CommunityCreation.jsx';
import { CommunityManage } from './components/CommunityCreation/CommunityManage.jsx';
import MemberRegisterForm from './components/CommunityCreation/MemberRegisterForm.jsx';
import AllMembers from './components/CommunityCreation/AllMember.jsx';
import Dashboard from './components/CommunityCreation/Dashboard.jsx';
import LoginForm from './components/CommunityCreation/LoginForm.jsx';
import CommunityPage from './components/CommunityCreation/CommunityPage.jsx'
import SamajButtons from './components/SamajButton.jsx';
import { CommiteeCreationForm } from './components/CommiteeCreation/CommiteeCreationForm.jsx';
import JodoBharaPopup from './components/JodoBharaPopup.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';
import MemberRegistrationForm from './components/Registration/MemberRegistrationForm.jsx';
import MemberLogin from './components/Registration/MemberLogin.jsx';
import MemberDashboard from './components/AdminDashboard/MemberDashboard.jsx';
import SuperAdmindashboard from './components/AdminDashboard/SuperAdmindashboard.jsx';
import AdminDetails from './components/AdminDashboard/AdminDetails.jsx';
import SubAdmindashboard from './components/AdminDashboard/SubAdminDashboard.jsx';
import ShopAllowDashboard from './components/AdminDashboard/ShopAllowedDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CommitteeCreation from './components/CommiteeCreation/CommiteeCreation.jsx';
import MemberCards from './components/memberCard/MemberCard.jsx';
import BloodGroup from './components/BloodGroup/BloodGroup.jsx';
import { CommitteeManage } from './components/CommiteeCreation/CommiteeManage.jsx';
import NewPost from './components/AdminDashboard/NewsPost.jsx';
import NewsManage from './components/AdminDashboard/ManageNews.jsx';
import NewsListPage from './components/AdminDashboard/NewsListPage.jsx';
import MemberDetails from './components/AdminDashboard/MemberDetails.jsx';
import PrivacyPolicy  from './components/privacy/PrivacyPolicy.jsx';
import ContactInfo from './components/privacy/ContactInfo.jsx';
import ProfessionCard from './components/Profession/ProfessionCard.jsx';
import { VivahRiste } from './components/VivahRiste/VivahRiste.jsx';
import Business from './components/Business/Business.jsx';
import ManageShop from './components/shop/ManageShop.jsx';

import CommunityMemberDetails from './components/AdminDashboard/CommunityMemberDetails.jsx';
import MemberDetail from './components/Business/MemberDetail.jsx';
import { ServiceForm } from './components/service/ServiceForm.jsx';
import ServiceManage from './components/service/ServiceManage.jsx';


function App() {
  return (
    <>
    <JodoBharaPopup/>
    <Router>
      <Routes>
      
        <Route path="/" element={<LandingPage/>} />
        <Route path="/community-member-dashboard" element={<CommunityMemberDetails/>} />
        <Route path="/memberregistration" element={<MemberRegistrationForm/>} />
        <Route path="/memberlogin" element={<MemberLogin/>} />
        <Route path="/superadmindashboard" element={<SuperAdmindashboard/>} />
        {/* <Route path="/superadmindashboard" element={<ProtectedRoute><SuperAdmindashboard /></ProtectedRoute>} /> */}
       
       <Route path="/blood-group" element={<BloodGroup/>} />
        <Route path="/member-card" element={<MemberCards/>} />
        <Route path="/committee-creation" element={<CommitteeCreation/>} />
         <Route path="/commitee-creation-form" element={<CommiteeCreationForm/>} />
          <Route path="/commitee-manage" element={<CommitteeManage/>} />
          <Route path="/news-post" element={<NewPost/>} />
          <Route path="/news-manage" element={<NewsManage/>} />
          <Route path="/news/:category" element={<NewsListPage/>} />
        <Route path="/member-details" element={<MemberDetails/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
         <Route path="/contact-info" element={<ContactInfo/>} />
          <Route path="/profession-card" element={<ProfessionCard/>} />
           <Route path="/vivah-riste" element={<VivahRiste/>} />
          <Route path="/business" element={<Business/>} />
          <Route path="/sidebar/:name" element={<SidebarMainLayout/>} />
         
       {/* <Route path="/sidebar/:memberName" element={<MemberDetail />} /> */}
      <Route path="/member-detail/:memberName" element={<MemberDetail />} />
        <Route path="/memberdashboard/:communityName" element={<MemberDashboard/>} />
        <Route path="/admindetails" element={<AdminDetails/>} />
        {/* <Route path="/subadmindashboard" element={<SubAdmindashboard/>} /> */}
        <Route path="/communitydashboard/:communityName" element={<SubAdmindashboard/>} />
        <Route path="/shopallow-dashboard" element={<ShopAllowDashboard/>} />
 
        <Route path="/manage-shop" element={<ManageShop/>} />
        <Route path="/samajbutton" element={<SamajButtons/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/admin/about/add" element={<AboutUsForm/>} />
        <Route path="/admin/about/manage" element={<ManageAboutUs />} />
   
        <Route path="/admin/management/add" element={<ManagementForm/>} />
        <Route path="/admin/management/manage" element={<ManageManagementTeam/>} />

        <Route path="/admin/certification/add" element={<CertificatesForm/>} />
        <Route path="/admin/certification/manage" element={<ManageCertificates/>} />

        <Route path="/admin/client/add" element={<ClientsForm/>} />
        <Route path="/admin/client/manage" element={<ClientManage/>} />
        
        <Route path="/admin/services/add" element={<ServiceForm/>} />
        <Route path="/admin/services/manage" element={<ServiceManage/>} />

        <Route path="/admin/contact/add" element={<ContactUsForm/>} />
        <Route path="/admin/contact/manage" element={<ContactUsManage/>} />

        <Route path="/products" element={<Product/>} />
        <Route path="/admin/product/add" element={<ProductAdd/>} />
        <Route path="/admin/product/manage" element={<ManageProducts/>} />
       
    
         {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
         <Route path="/community-create" element={<CommunityCreation/>} />
         <Route path="/community-manage" element={<CommunityManage/>} />

         <Route path="/member-registration" element={<MemberRegisterForm/>} />
         <Route path="/allmembers" element={<AllMembers/>} />
         <Route path="/community/:communityId" element={<CommunityPage/>} />
         <Route path="/login" element={<LoginForm/>} />
         <Route path="/commiteecreation" element={<CommiteeCreationForm/>} />
      
       
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
