import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, name }, n }) => {
  // console.log(name)
  // console.log(n)
  let isSentByCurrentUser = false;

  const trimmedName = n.trim().toLowerCase();
  const trimmedNamee= name.trim().toLowerCase()
 // console.log(trimmedNamee)
 // console.log(trimmedName)

  if(trimmedNamee === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{name}</p>
          </div>
        )
  );
}

export default Message;