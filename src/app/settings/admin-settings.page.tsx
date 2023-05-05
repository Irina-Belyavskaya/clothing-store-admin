// ============ Components =========================
import Layout from "../../components/layout.component";

// ============ Pages =========================
import ContentUserSettingsPage from "./content-admin-settings.page";

// ============ Constants =========================
import {nav} from "../constants/constants";

export default function UserSettingsPage () {
    return(
        <Layout nav={nav} title={'Settings'}>
            <ContentUserSettingsPage/>
        </Layout>
    );
}