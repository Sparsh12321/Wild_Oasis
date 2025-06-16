import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useSignup() {
    const { mutate: signUp, isLoading } = useMutation({
        mutationFn: signUpApi,
        onSuccess: (data) => {
            console.log(data);
            toast.success("Account successfully created,Please verify the account from the user's email address");
        }
    });
    return { signUp, isLoading }
}