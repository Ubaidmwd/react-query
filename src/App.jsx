// App.jsx

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components/Home";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
