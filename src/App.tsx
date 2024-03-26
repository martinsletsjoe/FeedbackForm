import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
        <div>Navn</div>
        <input value={inputName} onChange={handleNameInput} />
        <div>
          <Button colorScheme="blue" size="xs" type="submit">
            Submit
          </Button>
        </div>
      </div>
      <div>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Submissions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listFeedback.map((feedback, index) => (
                <Tr key={index}>
                  <Td>{feedback}</Td>
                  <Td isNumeric>{index + 1}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </form>
  );
}

export default App;
