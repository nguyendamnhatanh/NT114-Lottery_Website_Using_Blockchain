import React, { useState, useRef, useEffect } from 'react';
import Modal, { setAppElement } from 'react-modal';
import CustomButton from './CustomButton';
import { pickluck } from '../assets';

const MessageAlertBox = ({ title, message, type, handleConfirm, modalIsOpen, setModalIsOpen }) => {
    setAppElement('#root');
    const shouldRun = useRef(true);

    let alertClass = '';
    let iconClass = ''; 

    // console.log('type', type)
    // console.log('message', message)

    useEffect(() => {       
        if (shouldRun) {
            shouldRun.current = false;            
        }
        else return
    }, [shouldRun]);

    if (type === 'success') {
        alertClass = 'bg-green-100 border-green-400 text-green-700';
        iconClass = 'text-green-500';
    } else if (type === 'warning') {
        alertClass = 'bg-yellow-100 border-yellow-400 text-yellow-700';
        iconClass = 'text-yellow-500';
    } else if (type === 'error') {
        alertClass = 'bg-red-100 border-red-400 text-red-700';
        iconClass = 'text-red-500';
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}
                className={`font-epilogue font-bold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-transparent border-[1px] border-[#2C3333]`}
            >
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Message Alert Box Modal"
            >
                <div className={`flex items-center justify-between border-l-4 px-3 py-2 ${alertClass} shadow-sm`} role="alert">
                    <div className="flex items-center">
                        <svg className={`w-6 h-6 mr-2 ${iconClass}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {type === 'success' && (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            )}
                            {type === 'warning' && (
                                <>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z" />
                                </>
                            )}
                            {type === 'error' && (
                                <>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </>
                            )}
                        </svg>
                        <div>
                            <h4 className="text-lg font-bold">{title}</h4>
                            <p className="text-sm">{message}</p>
                        </div>
                    </div>
                    <div>
                        <button className="font-bold" onClick={handleConfirm}>
                            OK
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MessageAlertBox;