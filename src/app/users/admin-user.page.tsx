//============== Constants ===================
import { nav } from "../constants/constants";

//============== Components ===================
import ContentAdminUsersPage from "./content-users.component";
import Layout from "../../components/layout.component";

export default function AdminUsersPage () {
  return(
    <Layout nav={nav} title={'Administrator'}> 
      <ContentAdminUsersPage/>
    </Layout>
  );
} 