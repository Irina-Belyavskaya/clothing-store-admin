import Layout from "../../components/layout.component";
import { nav } from "../constants/constants";
import ContentAdminProductsPage from "./content-products.components";

export default function AdminProductsPage() {
  return (
    <Layout nav={nav} title={"Administrator"}>
      <ContentAdminProductsPage />
    </Layout>
  );
}
