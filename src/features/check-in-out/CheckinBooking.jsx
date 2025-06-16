import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams, useSearchParams } from "react-router-dom";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking = {}, isLoading } = useBooking();
  const { settings = {}, isLoading: isLoadingSetting } = useSettings();
  console.log(settings);

  const { checkin, isCheckin } = useCheckin();
  useEffect(function () {
    setConfirmPaid(booking?.isPaid || false)
  }, [booking.isPaid]);

  if (isLoading || isLoadingSetting) return <Spinner />;



  const {
    id: bookingId,
    Guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,

  } = booking;
  const optionalBreakfastPrice = settings.breakFastPrice * numGuests * numNights;


  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId, breakfast: {
          hasBreakfast: true, extrasPrice: optionalBreakfastPrice, totalPrice: totalPrice + optionalBreakfastPrice
        }
      })
    }
    else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && <Box>
        <Checkbox id="breakfast" checked={addBreakfast} onChange={() => {
          setAddBreakfast((breakfast) => !breakfast);
          setConfirmPaid(false);
        }}
        >Want to add Breakfast for {formatCurrency(optionalBreakfastPrice)} ?</Checkbox>
      </Box >}
      <Box>
        <Checkbox disabled={confirmPaid || isCheckin} id="confirm" checked={confirmPaid} onChange={() => setConfirmPaid((paid) => !paid)}>I confirm that {Guests.fullName} has paid the total amount of {addBreakfast ? `${formatCurrency(totalPrice + optionalBreakfastPrice)} ( ${formatCurrency(totalPrice)}+${formatCurrency(optionalBreakfastPrice)})` : formatCurrency(totalPrice)} </Checkbox>
      </Box >
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckin} variation="primary" size="medium" onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
