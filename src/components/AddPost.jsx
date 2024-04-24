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
      onSuccess: () => {
        cache.invalidateQueries("posts");
      },
      onMutate: async (newPost) => {
        if (isUpdate) {
          await cache.cancelQueries("post");
          const previousPosts = cache.getQueryData(["post", id]);
          console.log(newPost);
          cache.setQueryData(["post", id], () => {
            return { data: newPost };
          });
          return { previousPosts };
        }
      },
      onError: (error, newPost, context) => {
        cache.setQueryData(["post", id], context.previousPosts);
        toast({ status: "error", title: error.message });
      },
      onSettled: () => {
        cache.invalidateQueries(["post", id]);
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
