import { useEffect, useState } from "react";

//============== Types ===================

//============== Componets ===================
import AppTable from "components/app-table.component";
import OpenModalFormButton from "components/modal-open-form-button.component";
import ModalCategoryForm from "./modal-category-form.component";
import ConfirmDeletionWindow from "components/modal-form-confirm-delete.component";
import Loading from "components/loading.component";
import ErrorAlert from "components/error-alert.component";

//============== Redux ===================
import { useAppDispatch } from "../../hooks/redux";
import {
  createCategory,
  deleteCategory,
  getCategories
} from "./store/categories.actions";
import { useCategorySelector } from "./store/categories.selectors";

//============== Constants ===================
import { columnsCategories } from "../constants/constants";
import AppTextStatus from "components/app-text-status.component";


export default function ContentAdminCategoriesPage() {
  const dispatch = useAppDispatch();
  const { categories, errors, pending } = useCategorySelector();

  const [openForm, setOpenForm] = useState(false);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [id, setId] = useState<number | string | undefined>(undefined);

  useEffect(() => {
    dispatch(getCategories());
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
    const categoryId = Number(id);
    dispatch(deleteCategory({categoryId}))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          handleCloseConfirmWindow();
        }
      })
  };

  return (
    <>
    {
      pending.categories
      ?
        <Loading/>
      :
        !errors.categories &&
        <>
          <OpenModalFormButton handleClickOpen={handleOpenForm} buttonTitle="CREATE CATEGORYE"/>
          {
            categories.length !== 0 
            ?
              <>
                <AppTable
                  rows={categories}
                  columns={columnsCategories}
                  isUserTable={false}
                  handleOpenFormEdit={handleOpenForm}
                  handleOpenConfirmDelete={handleOpenConfirmWindow}
                />
                <ConfirmDeletionWindow 
                  handleConfirm={handleConfirm} 
                  isOpen={openConfirmWindow} 
                  handleClose={handleCloseConfirmWindow}
                  error={errors?.category}
                />
              </>
            :
              !errors.categories && <AppTextStatus text="Create first category!"/>
          }
          <ModalCategoryForm 
            id={id}  
            isOpen={openForm} 
            handleClose={handleCloseForm}
          />
        </>
    }
    { errors.categories && <ErrorAlert title="Error" text={errors.categories}/> }
    </>
  );
}

