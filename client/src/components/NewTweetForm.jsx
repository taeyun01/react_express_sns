import React, { useState } from "react";

const NewTweetForm = ({ tweetService, onError, onCreated }) => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    // 트윗 폼 작성시 트윗 생성
    tweetService
      .postTweet(tweet)
      .then(() => {
        setTweet("");
        // onCreated(created); // 이제 이부분은 필요없음 (소켓으로 실시간 생성을 했기 때문 (Tweets.jsx에서))
      })
      .catch(onError);
  };

  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <form className="tweet-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Edit your tweet"
        value={tweet}
        required
        autoFocus
        onChange={onChange}
        className="form-input tweet-input"
      />
      <button type="submit" className="form-btn">
        Post
      </button>
    </form>
  );
};

export default NewTweetForm;
