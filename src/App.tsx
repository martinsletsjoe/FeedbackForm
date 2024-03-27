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
  // inputs
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [listFeedback, setListFeedback] = useState<FeedBack[]>([]);

  const addSubmit = () => {
    if (inputName.trim() !== "") {
      const newSubmit = {
        name: inputName,
        email: inputEmail,
      };
      setListFeedback([...listFeedback, newSubmit]);
    }
  };

  //handle inputs
  const handleEmailInput = (event) => {
    setInputEmail(event.target.value);
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
        <div>Epost</div>
        <input value={inputEmail} onChange={handleEmailInput} />
        <div>
          <Button colorScheme="blue" size="xs" type="submit">
            Submit
          </Button>
        </div>
      </div>
      <div>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption placement="top">Submissions</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listFeedback.map((feedback, index) => (
                <Tr key={index}>
                  <Td>{feedback.name}</Td>
                  <Td>{feedback.email}</Td>
                  <Td isNumeric>
                    <Button>Edit</Button>
                  </Td>
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
