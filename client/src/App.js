import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layouts'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import OrganizationList from './features/organization/organizationList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditOrganization from './features/organization/EditOrganization';
import NewOrganizationForm from './features/organization/NewOrganizationForm';
import Prefetch from './features/auth/Prefetch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        
        <Route element={<Prefetch />}>
        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="organizations">
            <Route index element={<OrganizationList />} />
            <Route path=":id" element={<EditOrganization />} />
            <Route path="new" element={<NewOrganizationForm />} />
          </Route>

        <Route path="users">

          <Route index element={<UsersList />} />
          <Route path=":id" element={<EditUser />} />
          <Route path="new" element={<NewUserForm />} />
        </Route>

        </Route>{/* End Dash */}
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;
