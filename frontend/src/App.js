import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import HomeContent from "./module/home/HomeContent";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import BAContent from "./module/bookAppointment/BAContent";
import LoginPageUser from "./pages/LoginPageUser";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import DoctorInformation from "./pages/DoctorInformation";
import VerifyRegister from "./pages/VerifyRegister";
import Service from "./pages/ServicePage";
import Appointments from "./pages/AppointmentsPage";
import AppointmentConfirmation from "./pages/AppointmentConfirmationPage";
import About from "./pages/About";
import ListDoctor from "./pages/ListDoctorPage";
import SampleDateSort from "./SampleDateSort";
import BAContentGuest from "./module/bookAppointment/BAContentGuest";
import BookAppointmentPageGuest from "./pages/BookAppointmentPageGuest";
import AppointmentConfirmationPageGuest from "./pages/AppointmentConfirmationPageGuest";
import DoctorInformationStaff from "../src/pages/staff/DoctorInformationStaff";
import RegisterEnterEmail from "../src/pages/forgotpassword/RegisterEnterEmail";
import RegisterLoginPassword from "../src/pages/forgotpassword/RegisterLoginPassword";
import VerifyRegisterForgot from "../src/pages/forgotpassword/VerifyRegisterForgot";
import ChooseNewPassword from "../src/pages/forgotpassword/ChooseNewPassword";
import AppointmentDetails from "../src/pages/doctor/AppointmentDetails";
import MedicalHistory from "../src/pages/doctor/MedicalHistory";

import AppointmentDetailsPageForNurse from "./pages/AppointmentDetailsPageForNurse";
import SchedulesPage from "./pages/SchedulesPage";
import React from "react";
import CheckinPage from "pages/CheckinPage";
import CIContent from "module/bookAppointment/CIContent";
import CheckinConfirmationPage from "pages/CheckinConfirmationPage";
import MyCalendar from "MyCalendar";
import CheckinListPage from "pages/CheckinListPage";
import CheckinDetails from "pages/doctor/CheckinDetails";
import UpdateAppointmentPage from "pages/UpdateAppointmentPage";
import AppointmentConfirmUpdatePage from "pages/AppointmentConfirmUpdatePage";
import EditProfile from "pages/EditProfile";
import ProfilePage from "pages/ProfilePage";
import NewsPage from "guest/NewsPage";
import ProfilePageForStaff from "pages/ProfilePageForStaff";

import MedicalRecordDetails from "pages/doctor/MedicalRecordDetails";
import PatientsPage from "pages/PatientsPage";
import DoctorsPage from "pages/DoctorsPage";
import ListOfAppointment from "../src/pages/ListOfAppointment";
import AdminPages from "./pages/admin/AdminPages";
import EditLocation from "pages/EditLocation";
import CreateNewInternalAcc from "pages/admin/CreateNewInternalAcc";
import CreateNewLocation from "pages/admin/CreateNewLocation";
import CreateNewRole from "pages/admin/CreateNewRole";
import CreateNewSpec from "pages/admin/CreateNewSpec";
import CreateNewSymptom from "pages/admin/CreateNewSymptom";
import EditRole from "pages/admin/EditRole";
import EditSpec from "pages/admin/EditSpec";
import EditSymptom from "pages/admin/EditSymptom";
import InternalAccountsPage from "pages/admin/InternalAccountsPage";
import LocationsPage from "pages/admin/LocationsPage";
import RolesPage from "pages/admin/RolesPage";
import SpecialtiesPage from "pages/admin/SpecialtiesPage";
import SymptomsPage from "pages/admin/SymptomsPage";
import ListDoctorPageForAll from "pages/ListDoctorPageForAll";
import ListPatientPageForAll from "pages/ListPatientPageForAll";
import PatientInformationStaff from "pages/staff/PatientInformationStaff";
import DoctorInformationdetail from "pages/doctor/DoctorInformationdetail";
import EditProfileDoctor from "pages/doctor/EditProfileDoctor";
import ListOfDoctor from "pages/doctor/ListOfDoctor";
import FaqPage from "pages/FaqPage";
import Successfull from "pages/Successfull";
import EditInternal from "pages/EditInternal";

function App() {
  const storedName = localStorage.getItem("token");
  console.log("in app.js");

  useEffect(() => {
    if (storedName !== null) {
      try {
        const decoded = jwtDecode(storedName);
        const expiredAt = decoded.exp;
        if (expiredAt < Date.now() / 1000) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <Routes>
      <Route element={<HomePage />}>
        <Route path="/" element={<HomeContent />}></Route>
      </Route>
      <Route element={<BookAppointmentPage />}>
        <Route
          path="/book_appointment"
          element={<BAContent></BAContent>}
        ></Route>
      </Route>
      <Route element={<UpdateAppointmentPage />}>
        <Route
          path="/update_appointment"
          element={<BAContent></BAContent>}
        ></Route>
      </Route>

      <Route element={<BookAppointmentPageGuest />}>
        <Route
          path="/book_appointment_guest"
          element={<BAContentGuest></BAContentGuest>}
        ></Route>
      </Route>
      <Route element={<CheckinPage />}>
        <Route path="/checkin" element={<CIContent></CIContent>}></Route>
      </Route>
      <Route path="/examination-list" element={<CheckinListPage />}></Route>

      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/login-user" element={<LoginPageUser />}></Route>
      <Route path="/service" element={<Service />}></Route>
      <Route path="/appointments" element={<Appointments />}></Route>
      <Route path="/patients" element={<PatientsPage />}></Route>
      <Route path="/doctors" element={<DoctorsPage />}></Route>
      <Route path="/internals" element={<InternalAccountsPage />}></Route>
      <Route path="/locations" element={<LocationsPage />}></Route>
      <Route path="/symptoms" element={<SymptomsPage />}></Route>
      <Route path="/specs" element={<SpecialtiesPage />}></Route>
      <Route path="/roles" element={<RolesPage />}></Route>
      <Route
        path="/appointmentConfirmation"
        element={<AppointmentConfirmation />}
      ></Route>
      <Route
        path="/appointmentConfirmUpdate"
        element={<AppointmentConfirmUpdatePage />}
      ></Route>
      <Route
        path="/checkinConfirmation"
        element={<CheckinConfirmationPage />}
      ></Route>
      <Route
        path="/appointmentdetailsfornurse"
        element={<AppointmentDetailsPageForNurse />}
      ></Route>
      <Route
        path="/appointmentConfirmationGuest"
        element={<AppointmentConfirmationPageGuest />}
      ></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/listDoctor" element={<ListDoctor />}></Route>
      <Route
        path="/listDoctorForAll"
        element={<ListDoctorPageForAll />}
      ></Route>
      <Route
        path="/listPatientForAll"
        element={<ListPatientPageForAll />}
      ></Route>
      <Route path="/verifyregister" element={<VerifyRegister />}></Route>
      <Route path="/test" element={<SampleDateSort />}></Route>
      <Route path="/doctorinformation" element={<DoctorInformation />}></Route>
      {/* staff */}
      <Route
        path="/informationdoctorstaff"
        element={<DoctorInformationStaff />}
      ></Route>
      <Route
        path="/informationpatientstaff"
        element={<PatientInformationStaff />}
      ></Route>
      {/* Forgot password */}
      <Route
        path="/registerenteremail"
        element={<RegisterEnterEmail />}
      ></Route>
      <Route
        path="/registerloginpassword"
        element={<RegisterLoginPassword />}
      ></Route>
      <Route
        path="/verifyregisterforgot"
        element={<VerifyRegisterForgot />}
      ></Route>
      <Route path="/choosenewpassword" element={<ChooseNewPassword />}></Route>
      {/* doctor */}

      <Route path="/schedules" element={<SchedulesPage />}></Route>
      <Route path="/calendar" element={<MyCalendar />}></Route>
      <Route
        path="/appointmentdetails"
        element={<AppointmentDetails />}
      ></Route>
      <Route path="/checindetails" element={<CheckinDetails />}></Route>
      <Route path="/medicaldetails" element={<MedicalRecordDetails />}></Route>
      <Route path="/medicalhistory" element={<MedicalHistory />}></Route>
      <Route path="/listofdoctor" element={<ListOfDoctor />}></Route>
      <Route
        path="/doctorinformationdetail"
        element={<DoctorInformationdetail />}
      ></Route>
      <Route
        path="/editprofilefordoctor"
        element={<EditProfileDoctor />}
      ></Route>

      <Route path="/profilepage" element={<ProfilePage />}></Route>
      <Route path="/editprofile" element={<EditProfile />}></Route>
      <Route path="/editlocation" element={<EditLocation />}></Route>
      <Route path="/editspec" element={<EditSpec />}></Route>
      <Route path="/editrole" element={<EditRole />}></Route>
      <Route path="/editinternal" element={<EditInternal />}></Route>
      <Route path="/editsymptom" element={<EditSymptom />}></Route>
      <Route path="/successfull" element={<Successfull />}></Route>

      <Route path="/createacc" element={<CreateNewInternalAcc />}></Route>
      <Route path="/createlocation" element={<CreateNewLocation />}></Route>
      <Route path="/createspec" element={<CreateNewSpec />}></Route>
      <Route path="/createrole" element={<CreateNewRole />}></Route>
      <Route path="/createsymptom" element={<CreateNewSymptom />}></Route>

      <Route path="/profilepagestaff" element={<ProfilePageForStaff />}></Route>
      <Route path="/newspage" element={<NewsPage />}></Route>
      <Route path="/listofappointment" element={<ListOfAppointment />}></Route>
      <Route path="/adminpages" element={<AdminPages />}></Route>
      <Route path="/faq" element={<FaqPage />}></Route>
    </Routes>
  );
}
export default App;
