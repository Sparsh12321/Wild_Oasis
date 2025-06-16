import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";


import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabintoEdit = {} }) {
  const { id: editId, ...editValues } = cabintoEdit;

  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;
  console.log(errors);
  const queryClient = useQueryClient();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: createCabins,
    onSuccess: () => {
      toast.success("Cabin Successfully Added");
      queryClient.invalidateQueries({
        queryKey: "cabins"
      });
      reset();
    },
    onError: (err) => { toast.error(err.message); }
  });
  function onSubmit(data) {

    mutate({ ...data, image: data.image[0] });

  }
  function onError(err) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError,)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input disabled={isAdding} type="text" id="name" {...register("name", {
          required: "This field is required"
        })} />

      </FormRow>

      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>

        <Input type="number" disabled={isAdding} id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required", min: {
            value: 1,
            message: "Capacity should be 1"

          }
        })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>

        <Input type="number" id="regularPrice" disabled={isAdding}{...register("regularPrice", {
          required: "This field is required", min: {
            value: 1,
            message: "Price should be at least 1"

          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>

        <Input type="number" id="discount" defaultValue={0} disabled={isAdding}{...register("discount", {
          required: "This field is required",
          validate: (value) => value < getValues().regularPrice || "Discount must be less than the Regular Price"
        })} />

      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>

        <Textarea disabled={isAdding} type="number" id="description" {...register("description", {
          required: "This field is required"
        })} defaultValue="" />
      </FormRow>

      <FormRow label="Cabin Photo">

        <FileInput id="image" accept="image/*"{...register("image", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button disabled={isAdding} variation="primary" size="medium" >Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
