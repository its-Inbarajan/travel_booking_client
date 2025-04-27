import React, { Dispatch, SetStateAction } from "react";

export interface Bookings {
  _id?: string;
  packageId?: {
    _id: string;
    base_price: string;
    end_date: string;
    from: string;
    start_date: string;
    to: string;
    package_name: string;
    posted_by: string[];
  };
  userId?: {
    address: string;
    _id: string;
    email: string;
    profile: string;
    user_name: string;
    isVerifyed: string;
    user_type: string;
    provider: string;
  };
}

export interface InitialState {
  data: Bookings[];
  count: number | null;
  setData: Dispatch<SetStateAction<Bookings[]>>;
  setCount: Dispatch<SetStateAction<number | null>>;
  createBookings: (params: Bookings) => void;
}

const InitialState: InitialState = {
  count: null,
  data: [],
  setCount: () => {},
  setData: () => {},
  createBookings: () => {},
};

export const BookingsContext = React.createContext<InitialState>({
  ...InitialState,
});

export const useBooking = () => {
  const booking = React.useContext(BookingsContext);
  if (!booking) {
    throw new Error("useBooking must used inside the booking context.");
  }
  return booking;
};
