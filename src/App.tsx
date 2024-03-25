import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [listFeedback, setListFeedback] = useState(["yoyo"]);

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  return (
    <form onSubmit="submit">
      <div>
        <div>Tilbakemelding</div>
        <input value={name} onChange={handleNameInput} />
      </div>
      <div>
        {listFeedback.map((feedback) => (
          <ul>
            <li>{feedback}</li>
          </ul>
        ))}
      </div>
    </form>
  );
}

export default App;
