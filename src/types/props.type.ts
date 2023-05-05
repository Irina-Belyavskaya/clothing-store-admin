import { ReactNode } from "react";
import { RowsCategories } from "app/categories/types/categories-rows.type";
import { RoleDto } from "../app/roles/types/role-dto.type";
import { UserDto } from "app/users/types/users-dto.type";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";


// =============== Table ===============
export type AppTableProps = {
  rows: Array<UserDto> | Array<RowsCategories> | Array<RoleDto>;
  columns: Array<Column>;
  isUserTable: boolean;
  handleOpenFormEdit: (id: string | number) => void;
  handleOpenConfirmDelete: (id: string | number) => void;
}

export type Column = {
  id: string;
  label: string;
  minWidth: number;
  format?: (value: number) => string;
};

// =============== Modal form layout ===============

export type ModalFormLayoutProps = {
  children: ReactNode;
  formTitle: string;
  buttonTitle: string;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  isOpen: boolean;
  handleClose: () => void;
};

export type OpenModalFormButtonProps = {
  buttonTitle: string;
  handleClickOpen: (id: string | number | undefined) => void;
}

// =============== Confirm window ===============

export type ConfirmWindowProps = {
  handleConfirm: () => void;
  isOpen: boolean;
  handleClose: () => void;
  error: string | null;
}

// =============== Modal role form ===============

export type ModalFormRoleProps = {
  id: number | string | undefined;
  isOpen: boolean;
  handleClose: () => void;
}

// =============== Layout ===============

export type LayoutProps = {
  children: ReactNode;
  nav: Array<NavParams>;
  title: string;
};

export type NavParams = {
  icon: ReactNode;
  text: string;
  navigatePath: string;
};