import React, { useState } from "react";
import { utils } from "@snapshot-labs/snapshot.js";
import axios from "axios";
import config from "../../lib/config";

const create = () => {
  const [searchSearchInputs, setSearchInputs] = useState([""]);
  const [foundSpaces, setFoundSpaces] = useState([]);
  const [hubName, setHubName] = useState("");

  const { subgraphRequest } = utils;

  const handleChange = (e) => {
    const newSearchInputs = [...searchSearchInputs];
    newSearchInputs[e.target.id] = e.target.value;
    setSearchInputs(newSearchInputs);
  };

  const handleHubNameChange = (e) => {
    setHubName(e.target.value);
  };

  const handleAddClick = (e) => {
    const newSearchInputs = [...searchSearchInputs];
    newSearchInputs[searchSearchInputs.length] = "";
    setSearchInputs(newSearchInputs);
  };

  const handleSearchClick = async (e) => {
    const { spaces } = await subgraphRequest(config.snapshotGraphUrl, {
      spaces: {
        __args: {
          first: 100,
          where: {
            id_in: searchSearchInputs,
          },
        },
        id: true,
        name: true,
      },
    });

    setFoundSpaces(spaces.map((space) => space.id));
  };

  const handlePostClick = async () => {
    axios
      .post(config.serverBaseUrl + "hubs", { spaces: foundSpaces, hubName })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Search spaces:</h1>
      <button onClick={handleAddClick}>Add field</button>
      {searchSearchInputs.map((e, idx) => (
        <div key={idx}>
          <label htmlFor={idx}>Space {idx + 1}:</label>
          <input
            onChange={handleChange}
            type="text"
            id={idx}
            value={searchSearchInputs[idx]}
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
          <div>
            <label htmlFor="hubName">Hub Name:</label>
            <input
              type="text"
              value={hubName}
              onChange={handleHubNameChange}
              id="hubName"
            />
          </div>
          <button onClick={handlePostClick} disabled={hubName.length === 0}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default create;
