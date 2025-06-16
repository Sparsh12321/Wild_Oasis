import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
export default function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    //1.
    const numBookings = bookings.length;

    //2.
    const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
    //3.
    const checkIns = confirmedStays.length;
    //4. 
    const occupancy = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);
    return (
        <>
            <Stat title="Bookings" color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
            <Stat title="Sales" color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
            <Stat title="Check ins" color='indigo' icon={<HiOutlineCalendarDays />} value={checkIns} />
            <Stat title="Occupancy Rate" color='yellow' icon={<HiOutlineChartBar />} value={Math.round(occupancy * 100) + "%"} />
        </>
    );
}