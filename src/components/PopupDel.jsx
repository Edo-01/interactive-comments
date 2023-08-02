function Popup({ cancella, setShowPop }) {
  return (
    <>
      <div className="opacizzante">
        <div className="pop">
          <h3>Delete comment</h3>
          <p>
            Are you sure want to delete this comment? This will remove the
            comment and can't be undone.{" "}
          </p>
          <button className="annulla-canc" onClick={() => setShowPop(false)}>
            N0, CANCEL
          </button>
          <button className="conferma-canc" onClick={cancella}>
            YES, DELETE
          </button>
        </div>
      </div>
    </>
  );
}

export default Popup;
