// ============== Components ==============
import Layout from "../../components/layout.component";

// ============== Redux ==============
import { nav } from "../constants/constants";

// ============== Personal info ==============
import ContentAdminPersonalInfo from "./content-admin-personal-info";

export default function AdminPersonalInfoPage() {
  return (
    <Layout nav={nav} title={"Administrator"}>
      <ContentAdminPersonalInfo/>
    </Layout>
  );
}
