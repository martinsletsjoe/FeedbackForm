import { Button } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [inputName, setInputName] = useState("");
  const [listFeedback, setListFeedback] = useState(["yoyo"]);

  const addSubmit = () => {
    if (inputName.trim() !== "") {
      setListFeedback([...listFeedback, inputName]);
    }
  };

  const handleNameInput = (event) => {
    setInputName(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>Tilbakemelding</div>
        <input value={inputName} onChange={handleNameInput} />
        <div>
          <Button colorScheme="blue" size="xs" type="submit">
            yoyo
          </Button>
        </div>
      </div>
      <div>
        {listFeedback.map((feedback, index) => (
          <ul key={index}>
            <li>{feedback}</li>
          </ul>
        ))}
      </div>
    </form>
  );
}

export default App;
