import React from "react";
import { Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
const AddPost = () => {
  return (
    <div>
      <Formik>
        <FormControl>
          <Input name="title" placeholder="title" size="md" />
        </FormControl>
      </Formik>
    </div>
  );
};

export default AddPost;
