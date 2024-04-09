import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import {
  Heading,
  Spinner,
  Container,
  Stack,
  Flex,
  Text,
  Grid,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const fetchData = async (pageId) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v1/posts?page=${pageId}`
    );
    return data;
  } catch (error) {
    throw new Error("Unable to fetch data");
  }
};

const Home = () => {
  const { id } = useParams();
  const pageId = parseInt(id);
  let navigate = useNavigate();

  const toast = useToast();
  const { data, isLoading } = useQuery(
    ["posts", pageId],
    () => fetchData(pageId),
    {
      keepPreviousData: true,
      onError: (error) => {
        toast({ status: "error", title: error.message });
      },
    }
  );

  return (
    <Container mt={"4"} maxW={"1300px"}>
      <Text>Current Page: {pageId}</Text>
      {isLoading ? (
        <Grid placeItems={"center"} height={"100vh"}>
          <Spinner />
        </Grid>
      ) : (
        <>
          {data &&
            data.data &&
            data.data.map((post) => (
              <Stack
                p="4"
                mt={"4"}
                boxShadow={"md"}
                borderRadius={"xl"}
                border={"1px solid #ccc"}
                key={post.id}
              >
                <Flex justify={"space-between"}>
                  <Text>userId: {post.user_id}</Text>
                  <Text>postId:{post.id}</Text>
                </Flex>
                <Heading>{post.title}</Heading>
                <Text>{post.body}</Text>
              </Stack>
            ))}
          <Flex justify={"space-evenly"} m={"4"}>
            <Button
              colorScheme="yellow"
              onClick={() => {
                if (pageId > 1) {
                  navigate(`/${pageId - 1}`);
                }
              }}
              disabled={pageId <= 1}
            >
              Prev
            </Button>

            <Button
              colorScheme="pink"
              onClick={() => {
                navigate(`/${pageId + 1}`);
              }}
            >
              Next
            </Button>
          </Flex>
        </>
      )}
    </Container>
  );
};

export default Home;
