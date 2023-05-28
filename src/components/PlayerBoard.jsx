import React from 'react'

import { CircularProgress } from '@mui/material'


const PlayerBoard = ({ entry }) => {

    return (
        <div className="flex-1 flex flex-col bg-[#1c1c24] items-center justify-center rounded-[10px]">

            <div className="flex flex-col w-full h-full  bg-[#1c1c24] rounded-[10px] ">

                <div className="bg-[#2E4F4F] rounded-t-[10px]">
                    <h2 className="text-lg font-medium text-center">Player Board</h2>
                </div>

                <div className="flex flex-col justify-start items-center overflow-y-auto h-full">
                    {
                        // // example dummy data
                        // dummyEntry.reverse().map((item, index) => (
                        //   <div key={`${index.player}`} className="flex justify-between items-center gap-4">
                        //     <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.player}</p>
                        //   </div>
                        // ))

                        entry
                            ?
                            (
                                entry.length > 0
                                    ?
                                    entry.map((player, index) =>
                                    (
                                        <div key={`${player}-${index}`} className="flex justify-between items-center gap-4 py-1">
                                            <p className="font-bold text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {player}</p>

                                        </div>
                                    ))
                                    :
                                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No player yet. Be the first one!</p>
                            )
                            :
                            <CircularProgress />
                    }
                </div>
            </div>
        </div>
    )
}

export default PlayerBoard