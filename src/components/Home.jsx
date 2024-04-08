// Home.jsx

import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Heading } from "@chakra-ui/react";

const fetchData = async () => {
  try {
    const { data } = await axios.get("https://gorest.co.in/public/v2/users");
    return data;
  } catch (error) {
    // throw new Error("Unable to fetch data");
    console.log(error);
  }
};

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Heading>Welcome TO React Query</Heading>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home; // Export Home component
