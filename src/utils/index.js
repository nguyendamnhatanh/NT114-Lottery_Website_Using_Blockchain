export const daysLeft = (timestamp) => {
  const difference = new Date(timestamp).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);
  return remainingDays.toFixed(0);
};

export const convertTimestampToDateString = (timestamp) => {
  const remainingTime = timestamp - Math.floor(Date.now() / 1000);
  const seconds = Math.floor(remainingTime % 60);
  const minutes = Math.floor((remainingTime / 60) % 60);
  const hours = Math.floor((remainingTime / (60 * 60)) % 24);
  const days = Math.floor(remainingTime / (60 * 60 * 24));
  const dateString = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return dateString;
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);
  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;
  if (img.complete) callback(true);
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const extractTicketData = (response) => {
  const result = [];
  const ticketData = response.map((ticket) => {
    const luckyNumber = ticket.luckyNumber;
    const createDate = ticket.createDate;
    const ticketData = {
      luckyNumber,
      createDate,
    };
    result.push(ticketData);
  });
  // console.log('result extractTicketData', result)
  return result;
};

export const getMessageBasedOnBuyStatus = (status, luckyNumber) => {
  // 0: denied by user
  // 1: success, 2: buying ticket, 3: sending transaction, 4: sent transaction success, 5: getting lucky number, 6: get lucky number success
  //-1: failed, -2: no transaction, -3: ..........., , -4: send transaction failed, -5: ...................., -6: get lucky number failed
  // console.log(status)
  // 
  switch (status) {
    case 0:
      return 'Transaction is denied by user. Please try again.';
    case 1:
      return 'Transaction is success. Your lottery number is: ' + luckyNumber + '. Please wait for the result.';
    case 2:
      return 'Transaction is pending. Please wait for the result.';
    case 3:
      return 'Processing your transaction. Please wait for the result.';
    case 4:
      return 'Transaction is success. Please wait for the result.';
    case 5:
      return 'Getting lucky number. Please wait for the result.';
    case 6:
      return 'Get lucky number success. Please wait for the result.';
    case 7:
      return 'Getting User Data';
    case -1:
      return 'Getting User Data';
    case -2:
      return 'Not enough balance. Please try again.';
    case -3:
      return 'Unknown error. Please try again.';
    case -4:
      return 'Something went wrong. Please try again.';
    case -5:
      return 'Unknown error. Please try again.';
    case -6:
      return 'Get lucky number failed. Please try again.';
    default:
      return 'Unknown error. Please try again.';

  }

  // status === 0 ? 'Transaction is failed. Please try again.' :
  //   status === 1 ? 'Transaction is success. Your lottery number is: ' + luckyNumber + '. Please wait for the result.' :
  //     status === 2 ? 'Transaction is pending. Please wait for the result.' :
  //       status === 3 ? 'Transaction is under processing. Please wait for the result.' :
  //         status === -1 ? 'There is no Transaction found. Please try again.' :
  //           status === -2 ? 'Not enough balance. Please try again.' :
  //             status === -3 ? 'Transaction is canceled by user. Please try again.' :
  //               'Something went wrong. Please try again.'

};



