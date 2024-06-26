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
import { Link, useNavigate, useParams } from "react-router-dom";
import AddPost from "../components/AddPost";
import { fetchData } from "../api";

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
      {isLoading ? (
        <Grid placeItems={"center"} height={"100vh"}>
          <Spinner />
        </Grid>
      ) : (
        <>
          <AddPost />
          {data &&
            data.data &&
            data.data.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <Stack
                  p="4"
                  mt={"4"}
                  boxShadow={"md"}
                  borderRadius={"xl"}
                  border={"1px solid #ccc"}
                >
                  <Flex justify={"space-between"}>
                    <Text>userId: {post.user_id}</Text>
                    <Text>postId:{post.id}</Text>
                  </Flex>
                  <Heading>{post.title}</Heading>
                  <Text>{post.body}</Text>
                </Stack>
              </Link>
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
            <Text>Current Page: {pageId}</Text>

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
