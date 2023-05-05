import { useEffect, useState } from "react";

//============== Constants ===================
import { columnsUser } from "../constants/constants";

//============== Components ===================
import AppTable from "components/app-table.component";
import ModalUserForm from "./modal-user-form-role.component";
import ModalStatusForm from "./modal-user-form-status.component";
import Loading from "components/loading.component";
import ErrorAlert from "components/error-alert.component";

//============== Redux ===================
import { useAppDispatch } from "hooks/redux";
import { useUserSelector } from "./store/users.selectors";
import { getUsers } from "./store/users.actions";

export default function ContentAdminUsersPage() {
  const dispatch = useAppDispatch();
  const { users, pending, errors } = useUserSelector();

  const [openForm, setOpenForm] = useState(false);
  const [openStatusForm, setOpenStatusForm] = useState(false);
  const [id, setId] = useState<number | string | undefined>(undefined);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, id, openForm]);

  const handleOpenForm = (id: number | string | undefined) => {
    setId(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setId(undefined);
    setOpenForm(false);
  };

  const handleOpenStatusForm = (id: number | string | undefined) => {
    setId(id);
    setOpenStatusForm(true);
  };

  const handleCloseStatusForm = () => {
    setId(undefined);
    setOpenStatusForm(false);
  };

  return (
    <>
    {
      pending.users
        ?
          <Loading/>
        :
          !errors.users &&
          <>
            <AppTable
              rows={users}
              columns={columnsUser}
              isUserTable={true}
              handleOpenFormEdit={handleOpenForm}
              handleOpenConfirmDelete={handleOpenStatusForm}
            />
            <ModalUserForm 
              id={id}   
              isOpen={openForm} 
              handleClose={handleCloseForm}
            />
            <ModalStatusForm
              id={id}   
              isOpen={openStatusForm} 
              handleClose={handleCloseStatusForm}
            />
          </>
    }
    { errors.users && <ErrorAlert title="Error" text={errors.users}/> }
    </>
  );
}
