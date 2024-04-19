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

const AddPost = () => {
  return (
    <div>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
        }}
      >
        {({ values }) => (
          <Form>
            <Stack spacing={4} my={4}>
              <Heading size="lg">Add New Post</Heading>
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
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPost;
