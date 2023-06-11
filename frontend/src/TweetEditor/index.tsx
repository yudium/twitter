import { useState } from "react";
import axios from "axios";
import { Alert } from "../Alert";
import styled from "styled-components";
import { Button } from "../Button";

/**
 * Main component
 */
export function TweetEditor() {
  const [tweet, setTweet] = useState("");
  const [isShowAlert, setIsShowAlert] = useState(false);

  async function handleSubmit() {
    try {
      await axios.post("http://localhost:5055/tweet", {
        tweet,
      });
      setTweet("");
    } catch (e) {
      setIsShowAlert(true);
    }
  }

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      {isShowAlert && (
        <Alert variant="error">
          Something went wrong, but don't fret — let's give it another shot.
        </Alert>
      )}

      <Container>
        <ProfilePhoto />

        <EditorArea>
          <Textarea
            placeholder="What is happening?!"
            value={tweet}
            onChange={(e) => {
              setTweet(e.target.value);
              setIsShowAlert(false);
            }}
          />

          <Footer>
            <FooterLeft></FooterLeft>
            <FooterRight>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={tweet.trim() === ""}
              >
                Tweet
              </Button>
            </FooterRight>
          </Footer>
        </EditorArea>
      </Container>
    </Form>
  );
}

/**
 * Styled component
 */
const Form = styled.div`
  width: 598px;
  border-top: 1px solid rgb(47, 51, 54);
  border-left: 1px solid rgb(47, 51, 54);
  border-right: 1px solid rgb(47, 51, 54);
  border-bottom: 1px solid rgb(47, 51, 54);
  padding: 16px 16px 16px 16px;
`;

/**
 * Styled component
 */
const Textarea = styled.textarea`
  background: transparent;
  border: none;
  white-space: pre-wrap;
  line-height: 24px;
  word-wrap: break-word;
  cursor: text;
  max-height: 720px;
  overflow-x: hidden;
  padding: 12px 0;
  font-size: 20px;
  outline: none;
  color: white;
  font-family: inherit;
  resize: none;
  width: 100%;

  &::placeholder {
    color: #71767b;
  }
`;

/**
 * Styled component
 */
const EditorArea = styled.div`
  flex: 1;
`;

/**
 * Styled component
 */
const ProfilePhoto = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-image: url("https://pbs.twimg.com/profile_images/1611357650926862337/i_iF0vD6_x96.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  margin-top: 2px;
`;

/**
 * Styled component
 */
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

/**
 * Styled component
 */
const Footer = styled.div`
  padding: 12px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid rgb(47, 51, 54);
`;

/**
 * Styled component
 */
// give a name to the elements so it JSX structure is easier to understand
const FooterLeft = styled.div``;

/**
 * Styled component
 */
// give a name to the elements so it JSX structure is easier to understand
const FooterRight = styled.div``;
