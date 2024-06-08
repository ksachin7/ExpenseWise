import React from 'react'
import styled from "styled-components";
// import Stats from './Stats';
// import { useRecentBookings } from '../dashboard/useRecentBookings';
// import { useRecentStays } from '../dashboard/useRecentStays';
import { Spinner } from '../ui/Spinner';
// import SalesChart from './SalesChart';
// import  DurationChart  from './DurationChart';
// import TodayActivity from '../check-in-out/TodayActivity'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout() {
  // const { bookings, isLoading: isLoading1 } = useRecentBookings();
  // const { stays, confirmedStays, isLoading: isLoading2 } = useRecentStays();

  // if (isLoading1 || isLoading2) return <Spinner />
  // console.log(bookings);

  return (
    <StyledDashboardLayout>
      {/* <Stats bookings={bookings} confirmedStays={confirmedStays} /> */}
      {/* <Stats />
      <TodayActivity /> */}
      {/* <DurationChart /> */}
      {/* <SalesChart /> */}
    </StyledDashboardLayout>
  )
}

export default DashboardLayout