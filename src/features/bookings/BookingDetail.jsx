import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquareStack, HiArrowUpOnSquareStack, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { booking = {}, isLoading, error } = useBooking();
  const { checkout, isCheckout } = useCheckout();

  const { status, id: bookingId } = booking;

  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          {/* <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag> */}
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="danger" size="large" icon={<HiTrash />} onClick={() => {
          deleteBooking(bookingId);
          navigate("/bookings");
        }} disabled={isDeleting}>Delete</Button>
        {status === 'unconfirmed' && <Button variation="primary" size="medium" icon={<HiArrowDownOnSquareStack />} onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}
        {status === 'checked-in' && <Button variation="primary" size="medium" disabled={isCheckout} icon={<HiArrowUpOnSquareStack />} onClick={() => {
          checkout(bookingId);
          navigate("/bookings");
        }}>Check out</Button>}

        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
