import React, { useState } from "react"
import styles from "./reviewFormModal.module.css"
import { useDispatch, useSelector } from "react-redux"
import { closeReviewFormModal } from "../../../redux/actions/review.action"
import FormInput from "../../Form/FormInput/FormInput"
import axios from "../../../api/axios"

const ReviewFormModal = ({ restaurant }) => {

    const user_id = useSelector(state => state.auth.account._id)

    const dispatch = useDispatch()

    const [values, setValues] = useState({
        review: "",
        rating: "",
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
    
        try{
          const response = await axios.post('/reviews', 
            JSON.stringify({
                user_id,
                restaurant_id: restaurant._id,
                review: values.review,
                rating: values.rating
            }),
            {
              headers: { 'Content-Type': 'application/json'},
            })

        setValues({
            review: "",
            rating: "",
        })

        window.alert("Review Added Successfully")

        dispatch(closeReviewFormModal())

        }catch(error){
          window.alert("Error")
        }
    }
    
    
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
    ]

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <div className={styles.reviewFormModalBackground}>
            <div className={styles.reviewFormModalContainer}>
                <div className={styles.reviewFormModalCloseArrow}>
                    <button
                        onClick={() => {
                        dispatch(closeReviewFormModal())
                        }}
                    >
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit} className={styles.reviewFormModalFormContainer}>
                    <h1>Add Review</h1>
                    {inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewFormModal
