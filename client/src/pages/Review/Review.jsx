import React, { useState, useEffect } from 'react'
import styles from './review.module.css'
import axios from '../../api/axios'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Home/Navbar/Navbar'
import Cookies from 'universal-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleReviewById } from '../../redux/actions/review.action'
import { getCommentsByReviewId } from '../../redux/actions/comment.action'
import ReviewInfoSection from '../../components/Review/ReviewInfoSection/ReviewInfoSection'
import CommentsSection from '../../components/Review/CommentsSection/CommentsSection'

const Review = () => {

    const [ user, setUser ] = useState({})
    const review = useSelector(state => state.review.singleReviewById)
    const comments = useSelector(state => state.comment.commentsByReviewId)

    const cookies = new Cookies()
    const token = cookies.get('token')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const callReviewPage = async() => {
        try{
          const response = await axios.get('/auth/review', 
            {
              headers: { 
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
              }
            })
    
          setUser(response.data)
    
          if(response.status !== 200){
            const error = new Error(response.error)
            throw error 
          }
        }catch(error){
          navigate('/signin')
        }
    }
    
    useEffect(() => {
        callReviewPage()
        dispatch(getSingleReviewById(id))
        dispatch(getCommentsByReviewId(id))
    }, [])

  return (
    <>
        <Navbar user={user}/>
        <main className={styles.reviewPageContainer}>
            <ReviewInfoSection user={user} review_id={id} review={review}/>
            <CommentsSection comments={comments}/>
        </main>
    </>
)
}

export default Review