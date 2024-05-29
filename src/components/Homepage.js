import React from "react";

const Homepage = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-12 bg-gray-50">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
          Strengthen Your Commitment with DecentralVows
        </h1>
        <p className="text-base text-gray-700 mb-6">
          In today’s fast-paced world, maintaining a strong, committed relationship can be challenging. Enter
          DecentralVows, a revolutionary platform leveraging blockchain technology to solidify and secure the
          commitments of married couples.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Why DecentralVows?</h2>
        <p className="text-base text-gray-700 mb-6">
          Are you looking for a way to reinforce your commitment and ensure transparency in your marriage? DecentralVows
          offers a unique solution that incentivizes couples to stay committed while providing a fair and transparent
          system for managing disputes.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How It Works</h2>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Solidify Your Vows with Blockchain</h3>
        <p className="text-base text-gray-700 mb-6">
          With DecentralVows, each party in a marriage submits their vow by depositing 5 ETH into a secure smart
          contract. This action locks a total of 10 ETH, symbolizing the mutual commitment of both individuals.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Incentives for Staying Committed</h3>
        <p className="text-base text-gray-700 mb-6">
          As a couple who remains committed, you are entitled to share the pot, which is increased each time a couple
          divorces. This pot accumulates over time, providing a unique incentive for couples to work through their
          differences and stay together.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Example:</h3>
        <p className="text-base text-gray-700 mb-6">
          Imagine 5 couples using DecentralVows to strengthen their commitment. Each couple locks 10 ETH into the smart
          contract, resulting in a total of 50 ETH in the pot.
        </p>

        <ul className="list-disc list-inside text-base text-gray-700 mb-6 pl-4">
          <li>Initial Pot: 50 ETH (5 couples x 10 ETH)</li>
          <li>Couples A, B, C, D, and E are committed.</li>
          <li>Couple A and Couple B get divorced:</li>
          <ul className="list-disc list-inside pl-8">
            <li>
              Couple A: The reporter gets 2 ETH back, and the other party accepts, getting 1 ETH. The remaining 7 ETH
              stays in the pot.
            </li>
            <li>
              Couple B: The reporter gets 2 ETH back, and the other party accepts, getting 1 ETH. The remaining 7 ETH
              stays in the pot.
            </li>
          </ul>
          <li>Divorce Process:</li>
          <ul className="list-disc list-inside pl-8">
            <li>Couple A: 10 ETH (initial) - 3 ETH (refunds) = 7 ETH stays in the pot</li>
            <li>Couple B: 10 ETH (initial) - 3 ETH (refunds) = 7 ETH stays in the pot</li>
          </ul>
          <li>
            Pot after divorces: Initial Pot: 50 ETH, Refunds to couples A and B: 6 ETH (3 ETH per couple x 2 couples),
            Total Pot: 44 ETH (50 ETH - 6 ETH)
          </li>
          <li>Remaining Couples: Couples C, D, and E remain committed.</li>
          <li>Incentive Distribution:</li>
          <ul className="list-disc list-inside pl-8">
            <li>The pot is now 44 ETH, shared among the remaining 3 couples.</li>
            <li>Each couple’s share: 44 ETH / 3 couples ≈ 14.67 ETH per couple.</li>
            <li>Each individual’s share: 14.67 ETH / 2 ≈ 7.33 ETH per individual.</li>
          </ul>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Fair and Transparent Divorce Process</h2>
        <p className="text-base text-gray-700 mb-6">
          While DecentralVows encourages and rewards commitment, we understand that sometimes, separations are
          inevitable. In such cases, DecentralVows ensures a streamlined and fair process for all parties involved.
          Here’s how it works:
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Reporting the Divorce</h3>
        <p className="text-base text-gray-700 mb-6">
          The first party to report the divorce with a notarized document is refunded 2 ETH. This is just the beginning
          of a transparent review process.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Response Window</h3>
        <p className="text-base text-gray-700 mb-6">
          The other party has one week to accept the divorce. If they do, they are refunded 1 ETH, and the reporter
          receives their 2 ETH.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Dispute Review</h3>
        <p className="text-base text-gray-700 mb-6">
          If the divorce is not accepted or if there is inaction, a jury process is triggered. A jury of 5 members
          reviews the notarized document and votes on the validity of the divorce.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Voting and Quorum</h3>
        <p className="text-base text-gray-700 mb-6">
          The votes are tallied upon reaching a quorum of over 50%. If the votes for the divorce exceed those against,
          the divorce is confirmed. The reporter gets 2 ETH, and 8 ETH remains in the community pot. If the votes
          against the divorce are higher, the disputer receives 1 ETH, the reporter gets nothing, and 9 ETH remains in
          the pot.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Join the Future of Commitment</h2>
        <p className="text-base text-gray-700 mb-6">
          DecentralVows is not just an app; it’s a movement towards stronger, more secure marriages. By leveraging the
          power of blockchain, we ensure that every step is transparent and fair.
        </p>

        <p className="text-base text-gray-700 mb-6">
          Strengthen your commitment with DecentralVows. Secure your vows, ensure fairness, and experience a new era of
          marital stability and transparency.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
