import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
const GlobalContext = createContext(null);

function ComponentContext({ children }) {
  const [commenti, setCommenti] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [risposta, setRisposta] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const urlData = "/data.json";

  useEffect(() => {
    async function richiediDati() {
      let risp = await fetch(urlData);
      let obj = await risp.json();
      setCommenti(obj.comments);
      setCurrentUser(obj.currentUser);
    }
    richiediDati();
  }, [urlData]);
  function addComment(e, to) {
    const now = moment();
    e.preventDefault();
    (function test() {
      setCommenti([
        ...commenti,
        {
          id: uuidv4(),
          content: messaggio,
          createdAt: moment(now).fromNow(),
          replies: [],
          score: 0,
          user: {
            image: {
              png: currentUser.image.png,
              webp: currentUser.image.webp,
            },
            username: currentUser.username,
          },
        },
      ]);
    })();
    setMessaggio("");
  }
  function rispondi(e, nome, id) {
    const now = moment();
    e.preventDefault();
    (function test() {
      console.log("rispondo: " + nome);
    })();

    setCommenti(
      commenti.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            replies: [
              ...obj.replies,
              {
                id: uuidv4(),
                content: risposta,
                createdAt: moment(now).fromNow(),
                score: 0,
                replyingTo: nome,
                user: {
                  image: {
                    png: currentUser.image.png,
                    webp: currentUser.image.webp,
                  },
                  username: currentUser.username,
                },
              },
            ],
          };
        } else {
          return obj;
        }
      })
    );
    setRisposta("");
    setMessaggio("");
  }
  function cancella(id) {
    setCommenti(
      commenti.filter((obj) => {
        return obj.id !== id;
      })
    );
  }
  function cancellaProfondo(id, esternoID) {
    setCommenti(
      commenti.map((obj) => {
        if (obj.id === esternoID) {
          return {
            ...obj,
            replies: [
              ...obj.replies.filter((obj) => {
                return obj.id !== id;
              }),
            ],
          };
        } else {
          return obj;
        }
      })
    );
  }
  function modificaProfondo(e, id, esternoID) {
    setCommenti(
      commenti.map((obj) => {
        if (obj.id === esternoID) {
          return {
            ...obj,
            replies: [
              ...obj.replies.map((obj) => {
                if (obj.id === id) {
                  return {
                    ...obj,
                    content: e.target.value,
                  };
                } else {
                  return obj;
                }
              }),
            ],
          };
        } else {
          return obj;
        }
      })
    );
  }
  function modificaAlto(e, id) {
    setCommenti(
      commenti.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            content: e.target.value,
          };
        } else {
          return obj;
        }
      })
    );
  }
  function aumentaScore(id) {
    setCommenti(
      commenti.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            score: obj.score + 1,
          };
        } else {
          return obj;
        }
      })
    );
  }
  function diminuisciScore(id) {
    setCommenti(
      commenti.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            score: obj.score - 1,
          };
        } else {
          return obj;
        }
      })
    );
  }
  function aumentaScoreInterno(id, esternoID) {
    setCommenti(
      commenti.map((obj) => {
        if (obj.id === esternoID) {
          return {
            ...obj,
            replies: [
              ...obj.replies.map((obj) => {
                if (obj.id === id) {
                  return {
                    ...obj,
                    score: obj.score + 1,
                  };
                } else {
                  return obj;
                }
              }),
            ],
          };
        } else {
          return obj;
        }
      })
    );
  }
  function diminuisciScoreInterno(id, esternoID) {
    setCommenti(
      commenti.map((obj) => {
        if (obj.id === esternoID) {
          return {
            ...obj,
            replies: [
              ...obj.replies.map((obj) => {
                if (obj.id === id) {
                  return {
                    ...obj,
                    score: obj.score - 1,
                  };
                } else {
                  return obj;
                }
              }),
            ],
          };
        } else {
          return obj;
        }
      })
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        commenti,
        currentUser,
        addComment,
        risposta,
        setRisposta,
        rispondi,
        messaggio,
        setMessaggio,
        cancella,
        cancellaProfondo,
        modificaProfondo,
        modificaAlto,
        aumentaScore,
        diminuisciScore,
        aumentaScoreInterno,
        diminuisciScoreInterno,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

function useMyContext() {
  return useContext(GlobalContext);
}

export { ComponentContext, useMyContext };
