import React from "react";

const MessageWrapper = (props) => {
  return (
    <div className="bg-white py-5 px-10 w-full   max-w-[500px] rounded-lg md:shadow-custom mx-auto">
      {props.children}
    </div>
  );
};

export default MessageWrapper;
