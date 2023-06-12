import React from 'react';


import { shortenAddress } from '../../../utils/shortenAddress';
import DisplayLuckyNumber from '../DisplayLuckyNumber';
import { useStateContext } from '../../../context';

const Winner = ({ winner }) => {

    const { address } = useStateContext();

    return (

        <div className="flex-1 flex flex-col bg-[#1c1c24] rounded-[10px] ">
            <div className="flex w-full justify-center">
                <div className="w-full bg-[#2E4F4F] rounded-t-[10px]">
                    <h2 className="text-lg font-medium text-center">Winner</h2>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center overflow-y-auto h-full gap-2 py-5 ">
                {
                    winner?.data ?
                        (
                            winner?.data?.address === address ?
                                <>
                                    <DisplayLuckyNumber isWinner={true} userTicket={[{ luckyNumber: winner?.data?.number }]} />
                                    <h2 className="text-lg font-mono text-center text-white"> {shortenAddress(winner?.data?.address)}</h2>
                                    {/* <ClaimAward winner={winner} /> */}
                                </>
                                :
                                <>
                                    <h2 className="text-lg font-mono text-center text-white"> Lucky Next Time </h2>
                                    <h2 className="text-md font-mono text-center text-white"> You are not the chosen one </h2>
                                    <h2 className="text-md font-mono text-center text-white"> {shortenAddress(winner?.data?.address)} </h2>
                                </>
                        )
                        :
                        (
                            <>
                                <h2 className="text-lg font-mono text-center text-white"> Winner haven't assigned yet </h2>
                            </>
                        )
                }
            </div>
        </div>

    )
}

export default Winner