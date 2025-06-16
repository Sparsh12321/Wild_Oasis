
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";


import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;
  console.log(errors);

  const { isAdding, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();



  const isWorking = isAdding || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) editCabin({ newCabinData: { ...data, image: image }, id: editId }, {
      onSuccess: () => {
        () => reset();
        onClose?.()

      }
    });
    else createCabin({ ...data, image: image }, {
      onSuccess: () => {

        reset();
        onClose?.()
      }
    });

  }
  function onError(err) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError,)} type={onClose ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input disabled={isWorking} type="text" id="name" {...register("name", {
          required: "This field is required"
        })} />

      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>

        <Input type="number" disabled={isWorking} id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required", min: {
            value: 1,
            message: "Capacity should be 1"

          }
        })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>

        <Input type="number" id="regularPrice" disabled={isWorking}{...register("regularPrice", {
          required: "This field is required", min: {
            value: 1,
            message: "Price should be at least 1"

          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>

        <Input type="number" id="discount" defaultValue={0} disabled={isWorking}{...register("discount", {
          required: "This field is required",
          validate: (value) => value < getValues().regularPrice || "Discount must be less than the Regular Price"
        })} />

      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>

        <Textarea disabled={isWorking} type="number" id="description" {...register("description", {
          required: "This field is required"
        })} defaultValue="" />
      </FormRow>

      <FormRow label="Cabin Photo">

        <FileInput id="image" accept="image/*"{...register("image", {
          required: isEditSession ? false : "This field is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onClose?.()} variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking} variation="primary" size="medium" >{isEditSession ? "Edit cabin" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
