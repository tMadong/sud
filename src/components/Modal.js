import React from "react";

const Modal = ({ isOpen, setIsOpen }) => {
  const style =
    "flex absolute left-0 top-0 right-0 bottom-0 items-center justify-center z-40 bg-[rgba(0,0,0,0.5)] scale-100";

  return (
    <div
      className={
        isOpen
          ? style
          : "flex absolute left-0 top-0 right-0 bottom-0 items-center justifyS-center z-40 bg-[rgba(0,0,0,0.5)]  scale-0"
      }
      onClick={() => {
        console.log("close model");
        setIsOpen(false);
      }}
    >
      <div
        className="w-[400px] bg-white p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h4>MODAL TITLE</h4>
        </div>
        <div>BODY</div>
        <div>
          <button className="bg-red-600 py-2 px-4 text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
