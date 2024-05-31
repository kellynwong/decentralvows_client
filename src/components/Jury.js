import React, { useContext, useState, useEffect } from "react";
import DataContext from "../Context/DataContext";

const Jury = () => {
  const data = useContext(DataContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disputes, setDisputes] = useState([]);
  const [voted, setVoted] = useState(false);

  const handleVote = async (coupleId, e, vote) => {
    setIsSubmitted(true);
    data.setIsLoading(true);
    e.preventDefault();
    try {
      const signer = await data.provider.getSigner();
      let transaction = await data?.jury.connect(signer).recordVotesByJury(coupleId, vote);
      await transaction.wait();
      data.setRefreshScreen((prev) => !prev);
      data.setIsLoading(false);
      setVoted(true);
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  // Retrieve and display DisputeDivorceDetails
  const fetchDisputes = async () => {
    try {
      let disputesArray = [];
      let count = await data?.jury?.disputeDivorceCount();
      count = parseInt(count?.toString());
      for (let x = 1; x <= count; x++) {
        // use (x) and not [x]
        let dispute = await data.jury.disputeCountToDetails(x);
        disputesArray.push(dispute);
      }
      setDisputes(disputesArray);
    } catch (error) {
      console.error("Failed to fetch disputes:", error);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, [data.account, data.refreshScreen]);

  return (
    <div>
      {" "}
      {voted && (
        <h1 className="text-2xl mt-[5rem] ml-[28rem] text-black font-extrabold">
          Vote has been successfully registered.
        </h1>
      )}
      <p className="ml-10 mb-4 p-6"></p>
      <div className="ml-20 mt-[-1rem] grid grid-cols-3 gap-y-12">
        {disputes?.map((dispute, index) => (
          <div key={index}>
            {" "}
            {dispute[5] === false ? (
              <>
                <h1 className="font-extrabold">Couple ID: {dispute[1].toString()}</h1> Voting has closed as quorum has
                been reached.
                <img
                  src={process.env.REACT_APP_PINATA_GATEWAY_URL + dispute[2]}
                  className="mt-[1rem] mb-[3rem] w-72 h-72 opacity-30"
                />
              </>
            ) : (
              <>
                <h1 className="font-extrabold">Couple ID: {dispute[1].toString()}</h1>
                Voting is live, please vote using buttons below.
                <img
                  src={process.env.REACT_APP_PINATA_GATEWAY_URL + dispute[2]}
                  className="mt-[1rem] mb-[3rem] w-72 h-72 opacity-70"
                />
                <button
                  className={`border-2 mt-[1rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
                    isSubmitted ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={(e) => handleVote(dispute[1], e, 0)}
                >
                  Vote For Divorce
                </button>
                <button
                  className={`border-2 mt-[1rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold ${
                    isSubmitted ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={(e) => handleVote(dispute[1], e, 1)}
                >
                  Vote Against Divorce
                </button>
              </>
            )}
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Jury;
