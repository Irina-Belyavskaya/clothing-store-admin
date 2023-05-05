//============== Constants ===================
import { nav } from "../constants/constants";

//============== Components ===================
import ContentAdminCategoriesPage from "./content-categories.component";
import Layout from "../../components/layout.component";

export default function AdminProductsPage() {
  return (
    <Layout nav={nav} title={"Administrator"}>
      <ContentAdminCategoriesPage />
    </Layout>
  );
}
