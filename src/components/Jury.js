import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";

const Jury = () => {
  const data = useContext(DataContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disputes, setDisputes] = useState([]);

  // Retrieve and display disputes
  let allDisputes = [];
  const fetchAllDisputes = async () => {
    let count = await data.jury.disputeDivorceCount();
    count = parseInt(count.toString());
    for (let x = 1; x <= count; x++) {
      let dispute = await data.jury.disputeCountToDetails(x); // use (x) and not [x]
      allDisputes.push(dispute);
    }
    setDisputes(allDisputes);
  };
  useEffect(() => {
    fetchAllDisputes();
  }, [data.account]);

  const handleEvent = async (id) => {
    let result = await data?.jury.getResults(id);
    data.setDisputeResults((prevResults) => ({ ...prevResults, [id]: result }));
  };

  useEffect(() => {
    if (data.jury) {
      console.log("Setting up event listener for quorumReached...");
      data.jury.on("quorumReached", handleEvent);
      return () => {
        console.log("Removing event listener for quorumReached...");
        data.jury.off("quorumReached", handleEvent);
      };
    }
  }, [data.jury]);

  // Vote
  const handleVote = async (coupleId, e, vote) => {
    setIsSubmitted(true);
    data.setIsLoading(true);
    e.preventDefault();
    try {
      const signer = await data.provider.getSigner();
      let transaction = await data?.jury.connect(signer).recordVotesByJury(coupleId, vote);
      await transaction.wait();
      data.setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  return (
    <div>
      <p className="ml-10 mb-4 p-6"></p>
      <div className="ml-20 mt-[-1rem] grid grid-cols-3 gap-y-12">
        {disputes.map((dispute, index) => (
          <div key={index}>
            <img
              src={process.env.REACT_APP_PINATA_GATEWAY_URL + dispute[2]}
              className="mt-[1rem] mb-[3rem] w-72 h-72"
            />
            <button
              className={`mt-4 rounded p-1 py-1 px-3 transition-colors border ${
                isSubmitted
                  ? "text-gray-500 bg-gray-100 cursor-not-allowed"
                  : "text-red-400 hover:bg-red-100 hover:text-black"
              }`}
              onClick={(e) => handleVote(dispute[1], e, 0)}
            >
              Vote For Divorce
            </button>
            <button
              className={`mt-4 rounded p-1 py-1 px-3 transition-colors border ${
                isSubmitted
                  ? "text-gray-500 bg-gray-100 cursor-not-allowed"
                  : "text-red-400 hover:bg-red-100 hover:text-black"
              }`}
              onClick={(e) => handleVote(dispute[1], e, 1)}
            >
              Vote Against Divorce
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jury;
