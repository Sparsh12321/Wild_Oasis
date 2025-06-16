import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {

    const queryClient = useQueryClient();
    const { isLoading: isUpdating, mutate: updateUser } = useMutation({


        mutationFn: updateCurrentUser,
        onSuccess: (data) => {
            // queryClient.setQueryData('user', user)
            console.log(data);
            toast.success("User Account Successfully Updated");
            queryClient.invalidateQueries({
                queryKey: ["user"]
            });

        },
        onError: (err) => { toast.error(err.message); }
    });
    return { isUpdating, updateUser };
};