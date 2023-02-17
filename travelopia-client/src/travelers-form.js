import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TravellersForm = () => {
  let navigate = useNavigate();

  const BUDGET_PER_PERSON = 1000;
  const initialForm = {
    name: "",
    email: "",
    city: "india",
    travelNumbers: 1,
    dollars: BUDGET_PER_PERSON,
  };

  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
  });

  return (
    <div className="travellers-form">
      <h2>Travelers Form</h2>
      <Formik
        initialValues={initialForm}
        validationSchema={FormSchema}
        onSubmit={async (values, { resetForm }) => {
          await axios
            .post(`http://localhost:4000/users`, { ...values })
            .then((res) => {
              alert(res.data.message);
              navigate("/travellers-list");
            })
            .catch((err) => alert(`user not added successfully: ${err} `));
          resetForm(initialForm);
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="form-display">
                <label htmlFor="Name">Name</label>
                <Field name="name" required className="form-field" />

                <label htmlFor="email">Email</label>
                <Field name="email" type="email" className="form-field" />

                <label htmlFor="City">City</label>
                <Field as="select" name="city" className="form-field">
                  <option value="india">India</option>
                  <option value="africa">Africa</option>
                  <option value="europe">Europe</option>
                </Field>

                <label htmlFor="No.of Travellers">No.of Travellers</label>
                <Field
                  name="travelNumbers"
                  type="number"
                  className="form-field"
                  min={1}
                  required
                  onChange={(e) => {
                    console.log(e.target.value);
                    setFieldValue("travelNumbers", parseInt(e.target.value));
                    setFieldValue(
                      "dollars",
                      parseInt(e.target.value) * BUDGET_PER_PERSON
                    );
                  }}
                />

                <label htmlFor="Dollars">Dollars</label>
                <Field
                  name="dollars"
                  className="form-field"
                  readOnly
                  value={`$${values.dollars}`}
                />

                <button type="submit">Submit</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TravellersForm;
