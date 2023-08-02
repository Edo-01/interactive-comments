import icoReplay from "../assets/images/icon-reply.svg";
import icoEdit from "../assets/images/icon-edit.svg";
import icoDelete from "../assets/images/icon-delete.svg";
import { useMyContext } from "../contesto/contesto";
import { InputComment, InputCommentStart } from "./InputComment";
import { useState } from "react";
import Popup from "./PopupDel";

function Risposte({
  content,
  createdAt,
  replyingTo,
  score,
  user,
  currentUser,
  obj,
  id,
  setComponentActive,
  componetActive,
}) {
  const {
    attivaRispondi,
    cancella,
    cancellaProfondo,
    modificaProfondo,
    modificaAlto,
    aumentaScoreInterno,
    diminuisciScoreInterno,
  } = useMyContext();
  const [edit, setEdit] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const img = user.image.webp;

  return (
    <div>
      <article className="base-commento-main">
        <div className="column-voto">
          <div className="counter-voto">
            <span onClick={() => aumentaScoreInterno(obj.id, id)}>+</span>
            <h4>{score}</h4>
            <span onClick={() => diminuisciScoreInterno(obj.id, id)}>-</span>
          </div>
        </div>
        <div className="column-content-main">
          <div className="row-intestazione">
            <img width={"38px"} src={img} alt="" />
            <h3>{user.username}</h3>
            {currentUser === user.username ? (
              <p className="buttonYou">you</p>
            ) : null}
            <p>{createdAt}</p>
          </div>

          {currentUser !== user.username ? (
            <p className="par-content">
              <span className="color-reply">{"@" + obj.replyingTo + " "}</span>
              {obj.content}
            </p>
          ) : null}
          {!edit && currentUser === user.username ? (
            <p className="par-content">
              <span className="color-reply">{"@" + obj.replyingTo + " "}</span>
              {obj.content}
            </p>
          ) : null}
          {currentUser === user.username && edit ? (
            <textarea
              onChange={(e) => {
                modificaProfondo(e, obj.id, id);
              }}
              className="mytextarea"
              name=""
              id=""
              cols="30"
              rows="5"
              value={content}
            ></textarea>
          ) : null}
          {currentUser === user.username && edit ? (
            <div className="rowUpdate">
              <button
                onClick={() => {
                  setEdit(false);
                }}
              >
                UPDATE
              </button>
            </div>
          ) : null}
        </div>
        <div className="container-actions">
          {currentUser !== user.username ? (
            <div className="colonna-singleAction">
              <img src={icoReplay} alt="" />
              <p
                onClick={() => {
                  setComponentActive(obj.id);
                }}
              >
                Reply
              </p>
            </div>
          ) : (
            <>
              <div
                onClick={() => setShowPop(true)}
                className="colonna-singleAction"
              >
                <img src={icoDelete} alt="" />
                <p className="pDelate">Delete</p>
              </div>
              <div
                onClick={() => setEdit(true)}
                className="colonna-singleAction"
              >
                <img src={icoEdit} alt="" />
                <p>Edit</p>
              </div>
            </>
          )}
        </div>
      </article>
      {componetActive === obj.id ? (
        <InputComment
          tipo={"rispondi"}
          rispondoTo={user.username}
          id={id}
          setComponentActive={setComponentActive}
        />
      ) : null}
      {showPop ? (
        <Popup
          cancella={() => cancellaProfondo(obj.id, id)}
          setShowPop={setShowPop}
        />
      ) : null}
    </div>
  );
}

function CommentMain({
  risposte,
  obj,
  currentUser,
  id,
  setComponentActive,
  componetActive,
  setMessaggio,
  setRisposta,
}) {
  const [showPop, setShowPop] = useState(false);
  const img = obj.user.image.webp;
  const {
    cancella,
    modificaAlto,
    risposta,
    commenti,
    aumentaScore,
    diminuisciScore,
  } = useMyContext();
  const [edit, setEdit] = useState(false);

  return (
    <section className="sezione-commento">
      <article className="base-commento-main">
        <div className="column-voto">
          <div className="counter-voto">
            <span
              onClick={() => {
                aumentaScore(obj.id);
              }}
            >
              +
            </span>
            <h4>{obj.score}</h4>
            <span
              onClick={() => {
                diminuisciScore(obj.id);
              }}
            >
              -
            </span>
          </div>
        </div>
        <div className="column-content-main">
          <div className="row-intestazione">
            <img width={"38px"} src={img} alt="" />
            <h3>{obj.user.username}</h3>
            {currentUser === obj.user.username ? (
              <p className="buttonYou">you</p>
            ) : null}
            <p>{obj.createdAt}</p>
          </div>
          {currentUser !== obj.user.username ? (
            <p className="par-content">{obj.content}</p>
          ) : null}
          {!edit && currentUser === obj.user.username ? (
            <p className="par-content">{obj.content}</p>
          ) : null}
          {currentUser === obj.user.username && edit ? (
            <textarea
              onChange={(e) => {
                modificaAlto(e, obj.id);
              }}
              className="mytextarea"
              name=""
              id=""
              cols="30"
              rows="5"
              value={obj.content}
            ></textarea>
          ) : null}
          {currentUser === obj.user.username && edit ? (
            <div className="rowUpdate">
              <button
                onClick={() => {
                  setEdit(false);
                }}
              >
                UPDATE
              </button>
            </div>
          ) : null}
        </div>
        <div className="container-actions">
          {currentUser !== obj.user.username ? (
            <div className="colonna-singleAction">
              <img src={icoReplay} alt="" />
              <p
                onClick={() => {
                  setComponentActive(obj.id);
                  setRisposta("");
                }}
              >
                Reply
              </p>
            </div>
          ) : (
            <>
              <div
                onClick={() => setShowPop(true)}
                className="colonna-singleAction"
              >
                <img src={icoDelete} alt="" />
                <p className="pDelate">Delete</p>
              </div>
              <div
                onClick={() => {
                  setEdit(true);
                }}
                className="colonna-singleAction"
              >
                <img src={icoEdit} alt="" />
                <p>Edit</p>
              </div>
            </>
          )}
        </div>
      </article>
      {componetActive === obj.id ? (
        <InputComment
          tipo={"rispondi"}
          rispondoTo={obj.user.username}
          id={id}
          setComponentActive={setComponentActive}
        />
      ) : null}
      <div className="container-risposte">
        {risposte.map((obj) => {
          return (
            <Risposte
              key={obj.id}
              {...obj}
              currentUser={currentUser}
              obj={obj}
              id={id}
              setComponentActive={setComponentActive}
              componetActive={componetActive}
            />
          );
        })}
      </div>
      {showPop ? (
        <Popup cancella={() => cancella(obj.id)} setShowPop={setShowPop} />
      ) : null}
    </section>
  );
}

function Commenti() {
  const { commenti, currentUser, setRisposta, setMessaggio } = useMyContext();
  const [componetActive, setComponentActive] = useState(null);

  return (
    <>
      {commenti.map((obj) => {
        return (
          <CommentMain
            key={obj.id}
            risposte={obj.replies}
            obj={obj}
            currentUser={currentUser.username}
            id={obj.id}
            setComponentActive={setComponentActive}
            componetActive={componetActive}
            setRisposta={setRisposta}
            setMessaggio={setMessaggio}
          />
        );
      })}
    </>
  );
}
export default Commenti;
