import Commenti from "./components/Commento";
import { InputCommentStart } from "./components/InputComment";
import { ComponentContext } from "./contesto/contesto";

function App() {
  return (
    <section className="section-main">
      <div>
        <ComponentContext>
          <Commenti />
          <InputCommentStart tipo={"generale"} />
        </ComponentContext>
      </div>
    </section>
  );
}

export default App;
