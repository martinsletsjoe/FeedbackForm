import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

enum FormState {
  SubmissionForm,
  EditForm,
  FeedbackList,
}

const emptyFeedback: Feedback = {
  id: -1,
  name: "",
  email: "",
  text: "",
  isEditing: false,
};

function App() {
  // edit inputs
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editText, setEditText] = useState("");
  const [editForm, setEditForm] = useState<Feedback>(emptyFeedback);
  // input fields
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputFeedback, setInputFeedback] = useState("");
  // list
  const [listOfFeedback, setListOfFeedback] = useState<Feedback[]>([]);
  // what to render
  const [currentFormState, setCurrentFormState] = useState<FormState>(
    FormState.SubmissionForm
  );

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const handleFeedbackInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputFeedback(event.target.value);
  };

  const isValidEmail = (email: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const addName = () => {
    if (inputName.trim() !== "" && isValidEmail(inputEmail)) {
      const newSubmission = {
        id: Date.now(),
        name: inputName,
        email: inputEmail,
        text: inputFeedback,
        isEditing: false,
      };
      setListOfFeedback([...listOfFeedback, newSubmission]);
      setInputName("");
      setInputEmail("");
      setInputFeedback("");
      setCurrentFormState(FormState.FeedbackList);
    }
  };

  const editFeedback = (id: number) => {
    const feedbackToEdit = listOfFeedback.find(
      (feedback) => feedback.id === id
    );
    if (feedbackToEdit) {
      setEditForm(feedbackToEdit);
      setEditName(feedbackToEdit.name);
      setEditEmail(feedbackToEdit.email);
      setEditText(feedbackToEdit.text);
      setCurrentFormState(FormState.EditForm);
    }
  };

  const reset = () => {
    setListOfFeedback([]);
    setCurrentFormState(FormState.SubmissionForm);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addName();
  };

  const saveEdit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!isValidEmail(editEmail)) {
      alert("Vennligst skriv inn en gyldig e-post adresse");
      return;
    }

    // map through to find and update the wanted feedback item
    const updatedFeedback = listOfFeedback.map((feedback) => {
      if (feedback.id === editForm?.id) {
        return {
          ...feedback,
          name: editName,
          email: editEmail,
          text: editText,
          isEditing: false,
        };
      }
      return feedback;
    });

    setListOfFeedback(updatedFeedback);

    // reset form fields and exit editmode
    setEditForm(emptyFeedback);
    setEditName("");
    setEditEmail("");
    setEditText("");
    setCurrentFormState(FormState.FeedbackList);
  };

  return (
    <div>
      {currentFormState === FormState.SubmissionForm && (
        <form onSubmit={handleSubmit}>
          <div>Navn</div>
          <Input
            type="text"
            placeholder="Navn"
            value={inputName}
            onChange={handleNameInput}
          />
          <div>Epost addresse</div>
          <Input
            type="text"
            placeholder="Epost"
            value={inputEmail}
            onChange={handleEmailInput}
          />
          <div>Tilbakemelding</div>
          <Input
            type="text"
            placeholder="Tilbakemelding"
            value={inputFeedback}
            onChange={handleFeedbackInput}
          />
          <Button type="submit" mx={3}>
            Send inn
          </Button>
          <Button onClick={reset}>Reset</Button>
        </form>
      )}
      {currentFormState === FormState.EditForm && (
        <form onSubmit={saveEdit}>
          <div>Navn</div>
          <Input
            type="text"
            placeholder="Navn"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div>Epost addresse</div>
          <Input
            type="text"
            placeholder="Epost"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <div>Tilbakemelding</div>
          <Input
            type="text"
            placeholder="Tilbakemelding"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <Button type="submit" mx={3}>
            Lagre
          </Button>
          <Button onClick={reset}>Reset</Button>
        </form>
      )}
      {currentFormState === FormState.FeedbackList && (
        <form onSubmit={handleSubmit}>
          <div style={{ margin: 3 }}>
            <p>Tilbakemelding</p>
            <br />
            {listOfFeedback.map((form) => (
              <ul key={form.id}>
                <li>
                  <div>Navn: {form.name}</div>
                  <div>Epost: {form.email}</div>
                  <div>Text: {form.text}</div>
                  <Button onClick={() => editFeedback(form.id)}>Rediger</Button>
                </li>
              </ul>
            ))}
            <Button onClick={reset}>Reset</Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
