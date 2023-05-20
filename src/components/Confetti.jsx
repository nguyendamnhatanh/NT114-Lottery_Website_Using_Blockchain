import React from 'react';

const Confetti = () => {
    let confettiNum = 200;
    let coinNum = 30;
    let dollarNum = 50;
    let elements = [];

    while (dollarNum > -1) {
        elements.push(<div key={`dollar-${dollarNum}`} className={`dollar-${dollarNum}`} />);
        dollarNum--;
    }

    while (coinNum > -1) {
        elements.push(<div key={`coin-${coinNum}`} className={`coin-${coinNum}`} />);
        coinNum--;
    }

    while (confettiNum > -1) {
        elements.push(<div key={`confetti-${confettiNum}`} className={`confetti-${confettiNum}`} />);
        confettiNum--;
    }

    return (
        <div className="confettiHerePlease dollarDollarBillYall moreMoneyMoreProblems">
            {elements}
        </div>        
    );
};

export default Confetti;