import React, { useEffect, useState } from "react";
import { utils } from "@snapshot-labs/snapshot.js";
import Proposals from "../components/Proposals";
import NewProposal from "../components/NewProposal";

const { subgraphRequest } = utils;

const Hub = (props) => {
  const { hub } = props;
  const [proposals, setProposals] = useState([]);
  const [creatingProposal, setCreatingProposal] = useState(false);

  const initiateProposalCreation = (e) => {
    setCreatingProposal(!creatingProposal);
  };

  useEffect(() => {
    const getProposals = async () => {
      const proposals = await subgraphRequest(
        "https://hub.snapshot.org/graphql",
        {
          proposals: {
            __args: {
              first: 100,
              where: {
                space_in: hub.spaces,
              },
            },
            id: true,
            title: true,
            state: true,
            space: {
              id: true,
              strategies: { name: true, network: true, params: true },
            },
          },
        }
      );
      return proposals;
    };

    // id
    // title
    // body
    // choices
    // start
    // end
    // snapshot
    // state
    // author
    // space {
    //   id
    //   name
    // }

    getProposals()
      .then((r) => {
        setProposals(r.proposals);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h1>Hub: {hub.hubName}</h1>
      <button onClick={initiateProposalCreation}>
        {creatingProposal ? "Cancel" : "New Proposal"}
      </button>
      {creatingProposal ? (
        <NewProposal hub={hub} />
      ) : (
        <Proposals proposals={proposals} />
      )}
    </div>
  );
};

export default Hub;
