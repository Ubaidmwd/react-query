import { useToast } from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { addNewPost, updatePost } from "../api";

const AddPost = ({ isUpdate, id }) => {
  const toast = useToast();
  const cache = useQueryClient();
  const { isLoading, data, mutateAsync } = useMutation(
    isUpdate ? "updatePost" : "addNewPost",
    isUpdate ? updatePost : addNewPost,
    {
      onMutate: async (postData) => {
        // Snapshot the current value
        const previousPosts = cache.getQueryData("posts");

        // Optimistically update the cache with the new post
        cache.setQueryData("posts", (oldPosts) => {
          if (isUpdate) {
            // If it's an update, update the specific post
            return oldPosts.map((post) =>
              post.id === id ? { ...post, ...postData } : post
            );
          } else {
            // If it's a new post, add it to the list
            return [...oldPosts, { id: Date.now(), ...postData }];
          }
        });

        // Return a function to revert the optimistic update
        return () => cache.setQueryData("posts", previousPosts);
      },
      onError: (error, variables, rollback) => {
        // If there's an error, revert the optimistic update
        rollback();
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
      onSettled: () => {
        // After the mutation, refetch the posts to get the latest data
        cache.invalidateQueries("posts");
      },
    }
  );
  return (
    <div>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values) => {
          isUpdate
            ? await mutateAsync({ title: values.title, body: values.body, id })
            : await mutateAsync({ title: values.title, body: values.body });
        }}
      >
        {({ values }) => (
          <Form>
            <Stack spacing={4} my={4}>
              <Heading size="lg">
                {" "}
                {isUpdate ? "Update" : "Add New"} Post
              </Heading>
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Field name="title" as={Input} placeholder="Enter title" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="body">Body</FormLabel>
                <Field name="body" as={Textarea} placeholder="Enter body" />
              </FormControl>
              <Button
                colorScheme="blue"
                type="submit"
                disabled={!values.title || !values.body}
              >
                {isUpdate ? "Update" : "Add"} Post
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPost;
