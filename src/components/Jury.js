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
      data.setIsLoading(false);
      setVoted(true);
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  // Retrieve and display DisputeDivorceDetails
  let disputesArray = [];
  const fetchDisputes = async () => {
    let count = await data?.jury?.disputeDivorceCount();
    count = parseInt(count?.toString());
    for (let x = 1; x <= count; x++) {
      // use (x) and not [x]
      let dispute = await data.jury.disputeCountToDetails(x);
      console.log(dispute);
      disputesArray.push(dispute);
    }
    setDisputes(disputesArray);
  };
  useEffect(() => {
    fetchDisputes();
  }, [data.account]);

  return (
    <div>
      {" "}
      {voted && (
        <h1 className="text-2xl mt-[5rem] ml-[28rem] text-red-400 font-extrabold">
          Vote has been successfully registered.
        </h1>
      )}
      <p className="ml-10 mb-4 p-6"></p>
      <div className="ml-20 mt-[-1rem] grid grid-cols-3 gap-y-12">
        {disputesArray.map((dispute, index) => (
          <div key={index}>
            {" "}
            {dispute[5].toString() === false ? (
              "Voting has closed as quorum has been reached."
            ) : (
              <>
                <h1 className="text-red-400 font-extrabold">Couple ID: {dispute[1].toString()}</h1>
                <h1 className="text-red-400 font-extrabold">Is Voting Live: {dispute[5].toString()}</h1>
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
              </>
            )}
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Jury;
