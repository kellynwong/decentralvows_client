import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Rings from "../assets/rings.png";
import Pot from "../assets/pot.png";
import Blockchain from "../assets/blockchain.png";
import Textile from "../assets/textile.png";
import DataContext from "../Context/DataContext";
import Carousel from "./Carousel";
import AnimatedText from "./AnimatedText";

const Homepage = () => {
  const data = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="font-chakra">
      <div
        className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-12 bg-gray-50 mt-[3rem] text-justify
      "
      >
        <section className="text-center mb-16">
          <h1 className="text-3xl italic font-extrabold text-gray-900 mb-6">
            Strengthen Your Marriage Commitment with DecentralVows
          </h1>
          <p className="text-base text-gray-700">
            Today’s marriages suffer from the nothing-at-stake problem. Solidify your marriage by committing to a
            transparent and fair contract with real value. Prove your love is forever and receive rewards as a couple.
          </p>
          <img src={Rings} className=" mx-auto mt-6 opacity-60 rounded-b-full" alt="Rings" />
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {" "}
            <AnimatedText text="Stake Together to Stay Together" />
          </h2>
          <p className="text-base text-gray-700">
            DecentralVows offers a unique solution that incentivizes couples to stay committed while providing a fair
            and transparent system for managing disputes. Marriage commitments are sacred: forever enshrined in the
            blockchain. Earn rewards for staking, but beware: breaking up gets you slashed, increasing the pot for those
            that stay together.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            <AnimatedText text="How It Works" />
          </h2>
          <section className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Solidify Your Vows with Blockchain</h3>
              <p className="text-base text-gray-700">
                With DecentralVows, each party in a marriage submits their vow by depositing 5 ETH into a secure smart
                contract. This action locks a total of 10 ETH, symbolizing the mutual commitment of both individuals.
              </p>
            </div>
            <div className="w-full ml-[2rem] opacity-70 md:w-1/2 flex justify-center">
              <img src={Blockchain} alt="Blockchain" className="rounded-r-full max-w-full h-auto" />
            </div>
          </section>

          <section className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="w-full  mr-[2rem] md:w-1/2 flex justify-center">
              <img src={Pot} alt="Pot" className="rounded-l-full opacity-30 max-w-full h-auto" />
            </div>
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn Rewards for Staying Committed</h3>
                <p className="text-base text-gray-700">
                  As a couple who remains committed, you are entitled to share the pot, which is increased each time
                  other couples are separated. This pot accumulates over time, providing a unique incentive for couples
                  to work through their differences and stay together. In addition, the ETH is restaked to earn
                  compounding rewards over the years!
                </p>
              </div>
            </div>
          </section>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Example:</h3>
            <p className="text-base text-gray-700">
              Imagine 5 couples using DecentralVows to strengthen their commitment. Each couple locks 10 ETH into the
              smart contract, resulting in a total of 50 ETH in the pot.
            </p>
            <ul className="list-disc list-inside text-base text-gray-700 pl-4">
              <li>Initial Pot: 50 ETH (5 couples x 10 ETH)</li>
              <li>Couples A, B, C, D, and E are committed.</li>
              <li>Couple A and Couple B get divorced:</li>
              <ul className="list-disc list-inside pl-8">
                <li>
                  Couple A: The reporter gets 2 ETH back, and the other party accepts, getting 1 ETH. The remaining 7
                  ETH stays in the pot.
                </li>
                <li>
                  Couple B: The reporter gets 2 ETH back, and the other party accepts, getting 1 ETH. The remaining 7
                  ETH stays in the pot.
                </li>
              </ul>
              <li>Divorce Process:</li>
              <ul className="list-disc list-inside pl-8">
                <li>Couple A: 10 ETH (initial) - 3 ETH (refunds) = 7 ETH stays in the pot</li>
                <li>Couple B: 10 ETH (initial) - 3 ETH (refunds) = 7 ETH stays in the pot</li>
              </ul>
              <li>
                Pot after divorces: Initial Pot: 50 ETH, Refunds to couples A and B: 6 ETH (3 ETH per couple x 2
                couples), Total Pot: 44 ETH (50 ETH - 6 ETH)
              </li>
              <li>Remaining Couples: Couples C, D, and E remain committed.</li>
              <li>Incentive Distribution:</li>
              <ul className="list-disc list-inside pl-8">
                <li>The pot is now 44 ETH, shared among the remaining 3 couples.</li>
                <li>Each couple’s share: 44 ETH / 3 couples ≈ 14.67 ETH per couple.</li>
                <li>Each individual’s share: 14.67 ETH / 2 ≈ 7.33 ETH per individual.</li>
              </ul>
            </ul>
          </div>
        </section>

        <section className="">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {" "}
            <AnimatedText text="Fair and Transparent Divorce Process" />
          </h2>
          <p className="text-base text-gray-700 mb-6">
            While DecentralVows encourages and rewards commitment, we understand that sometimes, separations are
            inevitable. In such cases, DecentralVows ensures a streamlined and fair process for all parties involved.
            Here’s how it works:
          </p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reporting the Divorce</h3>
            <p className="text-base text-gray-700">
              The first party to report the divorce with a notarized document stands to receive a refund of 2 ETH. This
              incentivizes timely reports, and is just the beginning of a transparent review process.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Window</h3>
            <p className="text-base text-gray-700">
              The other party has one week to accept the divorce. If they do, they are refunded 1 ETH, and the reporter
              receives their 2 ETH.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dispute Review</h3>
            <p className="text-base text-gray-700">
              If the divorce is not accepted within one week, a jury process is triggered. A jury of 5 members reviews
              the notarized document and votes on the validity of the divorce.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Voting and Quorum</h3>
            <p className="text-base text-gray-700">
              The votes are tallied upon reaching a quorum of over 50%. If the votes for the divorce exceed those
              against, the divorce is confirmed. The reporter gets 2 ETH, and 8 ETH remains in the community pot. If the
              votes against the divorce are higher, the disputer receives 1 ETH, the reporter gets nothing, and 9 ETH
              remains in the pot.
            </p>
          </div>
        </section>

        <section className="text-center mt-[-2rem] mb-12">
          <div className="relative inline-block mx-auto mt-6">
            <img src={Textile} className="rounded-t-full" alt="Textile" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 mt-2">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Marriage should be forever: Join us if you agree.
              </h2>
              <p className="text-base text-gray-700 mb-4">
                DecentralVows is not just an app; it’s a movement towards stronger, more secure marriages. By leveraging
                the power of blockchain, we ensure that every step of your contract is irrefutable, permanent,
                transparent and fair.
              </p>
              <p className="text-base text-gray-700 mb-4">
                Strengthen your commitment with DecentralVows. Secure your vows, ensure fairness, and experience a new
                era of marital stability and transparency.
              </p>
              <button
                onClick={() => navigate("/depositUser1")}
                className="border-2 mt-[1rem] border-zinc-300 py-2 px-4 rounded-full font-extrabold hover:bg-gray-200 hover:text-black"
              >
                <AnimatedText text="Start Now" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
