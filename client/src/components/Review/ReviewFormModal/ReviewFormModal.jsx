import React, { useState } from "react";
import styles from "./reviewFormModal.module.css";
import { useDispatch } from "react-redux";
import {
  closeReviewFormModal,
  getReviewsByRestaurantId,
} from "../../../redux/actions/review.action";
import FormInput from "../../Form/FormInput/FormInput";
import axios from "../../../api/axios";

const ReviewFormModal = ({ user, restaurant }) => {
  const user_id = user._id;

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    review: "",
    rating: "",
    images: "",
  });

  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("restaurant_id", restaurant._id);
    formData.append("review", values.review);
    formData.append("rating", values.rating);
    for (let key in values) {
      if (values[key] instanceof FileList) {
        for (let image in values[key]) {
          formData.append(key, values[key][image]);
        }
      }
    }

    try {
      const response = await axios.post("/reviews", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setValues({
        review: "",
        rating: "",
      });

      window.alert("Review Added Successfully");

      dispatch(closeReviewFormModal());
      dispatch(getReviewsByRestaurantId(restaurant._id));
    } catch (error) {
      window.alert("Error");
    }
  };

  const inputs = [
    {
      id: 1,
      name: "review",
      type: "text",
      placeholder: "Review",
      errorMessage: "Review is required",
      label: "Review",
      required: true,
    },
    {
      id: 2,
      name: "rating",
      type: "number",
      placeholder: "Rating",
      errorMessage: "Please enter rating between 1 to 5",
      min: 1,
      max: 5,
      label: "Rating",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.reviewFormModalBackground}>
      <div className={styles.reviewFormModalContainer}>
        <div className={styles.reviewFormModalCloseArrow}>
          <button
            onClick={() => {
              dispatch(closeReviewFormModal());
            }}
          >
            X
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className={styles.reviewFormModalFormContainer}
        >
          <h1>Add Review</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <div className={styles.imageFormInput}>
            <label>Add Images</label>
            <input
              name="images"
              multiple
              onChange={(e) => setValues({ ...values, images: e.target.files })}
              type="file"
              onBlur={() => setFocused(true)}
              onFocus={() => setFocused(true)}
              focused={focused.toString()}
            />
          </div>

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;
