import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import styles from "./likeDislike.module.css";

const LikeDislike = (props) => {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  if (props.review) {
    variable = { review_id: props.review_id, user_id: props.user_id };
  } else {
    variable = { comment_id: props.comment_id, user_id: props.user_id };
  }

  useEffect(() => {
    axios.post("like/getLikes", variable).then((response) => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setLikes(response.data.likes.length);

        //if I already click this like button or not
        response.data.likes.map((like) => {
          if (like.user_id === props.user_id) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    axios.post("like/getDislikes", variable).then((response) => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setDislikes(response.data.dislikes.length);

        //if I already click this like button or not
        response.data.dislikes.map((dislike) => {
          if (dislike.user_id === props.user_id) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);

  const onLike = () => {
    if (LikeAction === null) {
      axios.post("like/upLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");

          //If dislike button is already clicked

          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("Failed to increase the like");
        }
      });
    } else {
      axios.post("like/unLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("Failed to decrease the like");
        }
      });
    }
  };

  const onDisLike = () => {
    if (DislikeAction !== null) {
      axios.post("like/unDisLike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("Failed to decrease dislike");
        }
      });
    } else {
      axios.post("like/upDisLike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");

          //If dislike button is already clicked
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("Failed to increase dislike");
        }
      });
    }
  };

  return (
    <>
      <span className={styles.buttonContainer}>
        <button
          onClick={onLike}
          className={LikeAction === "liked" ? styles.like : ''}
        >
          LIKE
        </button>
        <span>{Likes}</span>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span className={styles.buttonContainer}>
        <button
          onClick={onDisLike}
          className={
            DislikeAction === "disliked"
              ? styles.dislike
              : ''
          }
        >
          DISLIKE
        </button>
        <span>{Dislikes}</span>
      </span>
    </>
  );
};

export default LikeDislike;
