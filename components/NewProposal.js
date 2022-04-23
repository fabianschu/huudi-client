import React, { useContext, useState } from "react";
import snapshot from "@snapshot-labs/snapshot.js";
import { Web3Context } from "../context/Web3Context";
import { providers } from "ethers";

const NewProposal = (props) => {
  const [space, setSpace] = useState("select space");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [choices, setChoices] = useState([""]);
  const [status, setStatus] = useState("");

  const { state } = useContext(Web3Context);
  const { web3Provider, address } = state;
  const { hub } = props;

  const client = new snapshot.Client712("https://hub.snapshot.org");

  const createProposal = async () => {
    const currentBlock = await web3Provider.getBlockNumber();

    client
      .proposal(web3Provider, address, {
        space,
        type: "single-choice",
        title,
        body,
        choices,
        start: Math.floor(Date.now() / 1000),
        end: Math.floor(Date.now() / 1000) + 120,
        snapshot: currentBlock,
        network: "4",
        strategies: JSON.stringify({}),
        plugins: JSON.stringify({}),
        metadata: JSON.stringify({}),
      })
      .then((r) => setStatus("success"))
      .catch((e) => {
        console.log(e);
        setStatus("error");
      });
  };

  const handleChange = (event) => {
    setSpace(event.target.value);
  };

  const handleChoiceChange = (e) => {
    const newChoices = [...choices];
    newChoices[e.target.id] = e.target.value;
    setChoices(newChoices);
  };

  const handleAddClick = (e) => {
    const newChoices = [...choices];
    newChoices[choices.length] = "";
    setChoices(newChoices);
  };

  const handleRemoveClick = (e) => {
    const newChoices = [...choices];
    newChoices.pop();
    setChoices(newChoices);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  console.log(hub.spaces);
  console.log(space);
  return (
    <div>
      <h1>New Proposal</h1>
      <div>
        <label>
          <p>Space:</p>
          <select value={space} onChange={handleChange}>
            {hub.spaces.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          <p>Title:</p>
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
      </div>
      <div>
        <label>
          <p>Description:</p>
          <textarea
            name="Text1"
            cols="40"
            rows="5"
            value={body}
            onChange={handleBodyChange}
          />
        </label>
      </div>
      <div>
        <p>Choices:</p>
        {choices.map((e, idx) => (
          <div key={idx}>
            <label htmlFor={idx}>Choice {idx + 1}:</label>
            <input
              onChange={handleChoiceChange}
              type="text"
              id={idx}
              value={choices[idx]}
            />
            <button onClick={handleRemoveClick}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddClick}>Add field</button>
      </div>
      <button onClick={createProposal}>Submit proposal</button>
      {status.length > 0 && <span>{status}</span>}
    </div>
  );
};

export default NewProposal;
