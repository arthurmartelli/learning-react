import { useSession } from "next-auth/react";
import {
  FormEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { api } from "~/utils/api";
import Button from "./Button";
import ProfileImage from "./ProfileImage";

export function NewTweetForm() {
  const session = useSession();
  if (session.status !== "authenticated") return null;

  return <Form />;
}

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;

  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  const trpcUtils = api.useContext();

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweets.create.useMutation({
    onSuccess: (newTweet) => {
      setInputValue("");

      if (session.status !== "authenticated") {
        return; //pretty much impossible to get here
      }

      trpcUtils.tweets.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null || oldData.pages[0] == null) return;

        const newCachedTweet = {
          ...newTweet,
          likeCount: 0,
          likedByMe: false,
          user: {
            id: session.data.user.id,
            name: session.data.user.name || null,
            image: session.data.user.image || null,
          },
        };

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              tweets: [newCachedTweet, ...oldData.pages[0].tweets],
            },
            ...oldData.pages.slice(1),
          ],
        };
      });
    },
  });

  if (session.status !== "authenticated") return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    createTweet.mutate({ content: inputValue });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's Happening?"
        />
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
}
