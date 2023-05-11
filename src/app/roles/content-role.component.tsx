import { useEffect, useState } from "react";

//============== Constants ===================
import { columnsRole } from "../constants/constants";

//============== Redux ===================
import { useAppDispatch } from "../../hooks/redux";
import { deleteRole, getRoles } from "./store/roles.actions";
import { useRoleSelector } from "./store/roles.selectors";

//============== Components ===================
import AppTable from "components/app-table.component";
import OpenModalFormButton from "components/modal-open-form-button.component";
import ModalRoleForm from "./modal-role-form.component";
import ConfirmDeletionWindow from "components/modal-form-confirm-delete.component";
import Loading from "components/loading.component";
import AppTextStatus from "components/app-text-status.component";
import ErrorAlert from "components/error-alert.component";


export default function ContentAdminRolePage() {
  const dispatch = useAppDispatch();
  const { roles, errors, pending } = useRoleSelector();

  const [openForm, setOpenForm] = useState(false);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [id, setId] = useState<number | string | undefined>(undefined);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch, id, openForm]);

  const handleOpenForm = (id: number | string | undefined) => {
    setId(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setId(undefined);
    setOpenForm(false);
  };

  const handleOpenConfirmWindow = (id: number | string | undefined) => {
    setId(id);
    setOpenConfirmWindow(true);
  };

  const handleCloseConfirmWindow = () => {
    setId(undefined);
    setOpenConfirmWindow(false);
  };

  const handleConfirm = () => {
    const roleId = Number(id);
    dispatch(deleteRole({ id: roleId }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          handleCloseConfirmWindow();
        }
      })
  }

  return (
    <>
      {
        pending.roles
          ?
          <Loading/>
          :
          !errors.roles &&
          <>
            <OpenModalFormButton handleClickOpen={handleOpenForm} buttonTitle="CREATE ROLE" />
            {
              roles.length !== 0
                ?
                <>
                  <AppTable
                    rows={roles}
                    columns={columnsRole}
                    isUserTable={false}
                    handleOpenFormEdit={handleOpenForm}
                    handleOpenConfirmDelete={handleOpenConfirmWindow}
                  />
                  <ConfirmDeletionWindow
                    handleConfirm={handleConfirm}
                    isOpen={openConfirmWindow}
                    handleClose={handleCloseConfirmWindow}
                    error={errors.role}
                  />
                </>
                :
                !errors.roles && <AppTextStatus text="Create first role!" />
            }
            <ModalRoleForm
              id={id}
              isOpen={openForm}
              handleClose={handleCloseForm}
            />
          </>
      }
      {errors.roles && <ErrorAlert title="Error" text={errors.roles} />}
    </>
  );
}
