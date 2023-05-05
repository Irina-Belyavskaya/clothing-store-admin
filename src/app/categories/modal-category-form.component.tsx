import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

//============== Types ===================
import { ModalFormRoleProps } from "types/props.type";
import { CreateCategoryDto } from "./types/create-category-dto.type";

//============== Redux ===================
import { useAppDispatch } from "../../hooks/redux";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "./store/categories.actions";
import { useCategorySelector } from "./store/categories.selectors";

//============== Yup ===================
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { schemaCreateCategory } from "./category-schemas.yap";

//============== Components ===================
import ModalFormLayout from "components/form-modal-layout.component";
import ErrorAlert from "components/error-alert.component";

export default function ModalCategoryForm({
  id,
  isOpen,
  handleClose
}: ModalFormRoleProps) {
  const dispatch = useAppDispatch();

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaCreateCategory),
    defaultValues: { name: "", description: "", image: "" },
  });

  const [formTitle, setFormTitle] = useState<string>("CREATE CATEGORY");
  const [buttonTitle, setButtonTitle] = useState<string>("CREATE");

  const categoryReducer = useCategorySelector();

  useEffect(() => {
    if (id) {
      const categoryId = Number(id);
      setFormTitle("UPDATE CATEGORY");
      setButtonTitle("UPDATE");
      dispatch(getCategoryById({ categoryId }));
    } else {
      setFormTitle("CREATE CATEGORY");
      setButtonTitle("CREATE");
    }
  }, [id]);

  useEffect(() => {
    if (categoryReducer.category) {
      setValue("name", categoryReducer.category.name);
      setValue("description", categoryReducer.category.description);
      setValue("image", categoryReducer.category.image);
    }
  }, [categoryReducer.category]);

  const handleSubmitCreate = (data: FieldValues) => {
    const dto: CreateCategoryDto = {
      name: data.name,
      description: data.description,
      image: data.image
    };

    dispatch(createCategory({ dto })).then(({ meta }) => {
      if (meta.requestStatus !== "rejected") {
        reset();
        handleClose();
      }
    });
  };

  const handleSubmitUpdate = (data: FieldValues) => {
    const dto: CreateCategoryDto = {
      name: data.name,
      description: data.description,
      image: data.image
    };

    const categoryId = Number(id);
    dispatch(updateCategory({ categoryId, dto })).then(({ meta }) => {
      if (meta.requestStatus !== "rejected") {
        reset();
        handleClose();
      }
    });
  };

  return (
    <ModalFormLayout
      formTitle={formTitle}
      buttonTitle={buttonTitle}
      handleSubmit={
        id ? handleSubmit(handleSubmitUpdate) : handleSubmit(handleSubmitCreate)
      }
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            helperText={errors.name ? `${errors.name.message}` : ""}
            margin="normal"
            label="Category name"
            name="categoryName"
            fullWidth
            value={value ? value : ""}
            onChange={onChange}
            error={errors.name ? true : false}
          />
        )}
      />
      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            helperText={errors.image ? `${errors.image.message}` : ""}
            margin="normal"
            label="Category image"
            name="categoryImage"
            fullWidth
            value={value ? value : ""}
            onChange={onChange}
            error={errors.image ? true : false}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            helperText={
              errors.description ? `${errors.description.message}` : ""
            }
            margin="normal"
            label="Category description"
            name="categoryDescription"
            fullWidth
            value={value ? value : ""}
            onChange={onChange}
            error={errors.description ? true : false}
          />
        )}
      />
      {categoryReducer.errors.category && <ErrorAlert title="Error" text={categoryReducer.errors.category} />}
    </ModalFormLayout>
  );
}
