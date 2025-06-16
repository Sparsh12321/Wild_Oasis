import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";
export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = { field, direction };
    //Pagination
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const { isLoading, data, error } = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page })
    });
    const bookings = data?.data || [];
    const count = data?.count || 0;
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount) {
        //Prefetching the data
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
        })
    }
    if (page > 1) {
        //Prefetching the data
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
        })
    }


    return { isLoading, bookings, error, count };
};