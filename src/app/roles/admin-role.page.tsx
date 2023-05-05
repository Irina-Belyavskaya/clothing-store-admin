import Layout from "../../components/layout.component";
import { nav } from "../constants/constants";
import ContentAdminRolePage from "./content-role.component";

export default function AdminRolePage() {
  return (
    <Layout nav={nav} title={"Administrator"}>
      <ContentAdminRolePage />
    </Layout>
  );
}