import { toast } from "sonner";
import { Bookings, BookingsContext } from "../context/bookingContext";
import React, { JSX } from "react";

export const BookingProvider = ({ children }: { children: JSX.Element }) => {
  const [data, setData] = React.useState<Bookings[]>([]);
  const [count, setCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    async function getBookings(): Promise<void> {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/bookings/getTrips`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }
        setData(result?.responses?.data);
        setCount(result?.responses.count);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }
    getBookings();
  }, []);

  async function createBookings(params: Bookings) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/createBooking`,
        {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      // setData([...data, result])
      toast.success(result.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <BookingsContext.Provider
      value={{ data, count, setCount, setData, createBookings }}
    >
      {children}
    </BookingsContext.Provider>
  );
};
