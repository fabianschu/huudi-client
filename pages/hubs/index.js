import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Hub from "../../components/Hub";
import { Web3Context } from "../../context/Web3Context";

const index = () => {
  const { state } = useContext(Web3Context);
  const { address } = state;
  const [hubs, setHubs] = useState([]);
  const [hub, setHub] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/hubs")
      .then(({ data }) => {
        const subscription = data.find((h) => {
          console.log(h.subscribers.includes(address));
          return h.subscribers.includes(address);
        });

        if (subscription) {
          setHub(subscription);
        } else {
          setHub({});
        }

        setHubs([...data]);
      })
      .catch((e) => console.log(e));
  }, [address]);

  const handleClick = (e) => {
    setHub(e.target.id);
  };

  const handleSubscribe = (e) => {
    const hubName = e.target.id;
    axios
      .put("http://localhost:5000/hubs", {
        hubName,
        subscriber: address,
      })
      .then(({ data }) => {
        setHub(data);
      })
      .catch((e) => console.log(e));
  };

  return hub.hubName ? (
    <Hub hub={hub} />
  ) : (
    <div>
      {hubs.map((hub) => {
        const { hubName, spaces } = hub;

        return (
          <div key={hubName}>
            <strong onClick={handleClick} id={hubName}>
              {hubName}
            </strong>
            <button onClick={handleSubscribe} id={hubName} disabled={!address}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default index;
