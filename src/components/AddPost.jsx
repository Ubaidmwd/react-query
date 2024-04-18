import React from "react";
import { Formik } from "formik";
// import { Form } from 'react-router-dom'
import { InputControl } from "formik-chakra-ui";
const AddPost = () => {
  return (
    <div>
      <Formik>
        <Form>
          <InputControl />
        </Form>
      </Formik>
    </div>
  );
};

export default AddPost;
