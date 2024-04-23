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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import AddPost from "./AddPost";
import { fetchPostData } from "../api";

const Post = () => {
  const { id } = useParams();

  const toast = useToast();
  const { data, isLoading } = useQuery(
    ["post", parseInt(id)],
    () => fetchPostData(id),
    {
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
          <AddPost isUpdate={true} id={data?.data?.id} />
          <Stack
            p="4"
            mt={"4"}
            boxShadow={"md"}
            borderRadius={"xl"}
            border={"1px solid #ccc"}
            key={data?.data?.id}
          >
            <Flex justify={"space-between"}>
              <Text>userId: {data?.data?.user_id}</Text>
              <Text>postId:{data?.data?.id}</Text>
            </Flex>
            <Heading>{data?.data?.title}</Heading>
            <Text>{data?.data?.body}</Text>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Post;
