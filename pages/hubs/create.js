import React, { useState } from "react";
import { utils } from "@snapshot-labs/snapshot.js";
import axios from "axios";
import config from "../../lib/config";

const create = () => {
  const [inputs, setInputs] = useState([""]);
  const [foundSpaces, setFoundSpaces] = useState([]);

  const { subgraphRequest } = utils;

  const handleChange = (e) => {
    const newInputs = [...inputs];
    newInputs[e.target.id] = e.target.value;
    setInputs(newInputs);
  };

  const handleAddClick = (e) => {
    const newInputs = [...inputs];
    newInputs[inputs.length] = "";
    setInputs(newInputs);
  };

  const handleSearchClick = async (e) => {
    console.log(config);
    const { spaces } = await subgraphRequest(config.snapshotGraphUrl, {
      spaces: {
        __args: {
          first: 100,
          where: {
            id_in: inputs,
          },
        },
        id: true,
        name: true,
      },
    });

    setFoundSpaces(spaces.map((space) => space.id));
  };

  const handlePostClick = async () => {
    console.log(config.serverBaseUrl + "hubs");
    axios
      .post(config.serverBaseUrl + "hubs", foundSpaces)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Search spaces:</h1>
      <button onClick={handleAddClick}>Add field</button>
      {inputs.map((e, idx) => (
        <div key={idx}>
          <input
            onChange={handleChange}
            type="text"
            id={idx}
            value={inputs[idx]}
          />
        </div>
      ))}
      <button onClick={handleSearchClick}>Search</button>
      {foundSpaces.length > 0 && (
        <>
          <h1>Found spaces:</h1>
          {foundSpaces.map((space) => (
            <p key={space}>{space}</p>
          ))}
          <button onClick={handlePostClick}>Submit</button>
        </>
      )}
    </div>
  );
};

export default create;
