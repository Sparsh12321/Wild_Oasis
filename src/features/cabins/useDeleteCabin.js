import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as DeleteCabinApi } from "../../services/apiCabins";
export function useDeleteCabin() {
    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: DeleteCabinApi,
        onSuccess: () => {
            toast.success("Cabin deleted Successfully");
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: (err) => toast.error(err.message)
    })

    return { isDeleting, deleteCabin };
};