import { useMyContext } from "../contesto/contesto";

function InputComment({ tipo, rispondoTo, id, chiudi, setComponentActive }) {
  const {
    commenti,
    currentUser,
    addComment,
    risposta,
    setRisposta,
    rispondi,
    messaggio,
    setMessaggio,
  } = useMyContext();

  let img = currentUser.image?.png ? currentUser.image.png : null;
  return (
    <section className="base-commento-main flex-top">
      <form className="flex-mob">
        <img width={"45px"} src={img} alt="" />
        <textarea
          onChange={(e) => setRisposta(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Add a comment..."
          value={risposta}
        ></textarea>
        {tipo === "generale" ? (
          <button onClick={(e) => addComment(e, "edo")} className="buttonSend">
            SEND
          </button>
        ) : null}
        {tipo === "rispondi" ? (
          <button
            onClick={(e) => {
              rispondi(e, rispondoTo, id);
              setComponentActive(null);
            }}
            className="buttonSend"
          >
            REPLAY
          </button>
        ) : null}
      </form>
    </section>
  );
}

function InputCommentStart({ tipo, rispondoTo, id, chiudi }) {
  const {
    commenti,
    currentUser,
    addComment,
    risposta,
    setRisposta,
    rispondi,
    messaggio,
    setMessaggio,
  } = useMyContext();

  let img = currentUser.image?.png ? currentUser.image.png : null;
  return (
    <section className="base-commento-main flex-top">
      <form className="flex-mob">
        <img width={"45px"} src={img} alt="" />
        <textarea
          onChange={(e) => setMessaggio(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Add a comment..."
          value={messaggio}
        ></textarea>
        {tipo === "generale" ? (
          <button onClick={(e) => addComment(e, "edo")} className="buttonSend">
            SEND
          </button>
        ) : null}
      </form>
    </section>
  );
}

export { InputComment, InputCommentStart };
