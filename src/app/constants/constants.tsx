import PeopleIcon from "@mui/icons-material/People";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff';


import { Column, NavParams } from "../../types/props.type";

export const nav: NavParams[] = [
  {
    icon: <PeopleIcon />,
    text: "Users",
    navigatePath: "/app/admin/users",
  },
  {
    icon: <SettingsAccessibilityIcon />,
    text: "Roles",
    navigatePath: "/app/admin/roles",
  },
  {
    icon: <ProductionQuantityLimitsIcon />,
    text: "Products",
    navigatePath: "/app/admin/products",
  },
  {
    icon: <CategoryIcon />,
    text: "Categories",
    navigatePath: "/app/admin/categories",
  },
  {
    icon: <SettingsIcon />,
    text: "Personal Info",
    navigatePath: "/app/admin/personal-info",
  },
  {
    icon: <VpnKeyOffIcon />,
    text: "Settings",
    navigatePath: "/app/admin/settings",
  },
];

export const columnsUser: Array<Column> = [
  { id: "email", label: "Email", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "fullName", label: "Full Name", minWidth: 150 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 175 },
  { id: "roleName", label: "Role Name", minWidth: 100 },
  { id: "roleType", label: "Role Type", minWidth: 100 },
];

export const columnsRole: Array<Column> = [
  { id: "name", label: "Role Name", minWidth: 150 },
  { id: "type", label: "Role Type", minWidth: 150 },
  { id: "permissions", label: "Permissions", minWidth: 150 },
];

export const columnsCategories: Array<Column> = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 100 },
  { id: "image", label: "Image", minWidth: 100 },
];