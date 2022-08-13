import React from "react";

export default function Client() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-1/6">
        <img src="./images/amazon.svg" className="mx-auto" alt="logo amazon" />
      </div>
      <div className="w-1/6">
        <img src="./images/microsoft.svg" className="mx-auto" alt="logo microsoft" />
      </div>
      <div className="w-1/6">
        <img src="./images/tesla.svg" className="mx-auto" alt="logo tesla" />
      </div>
      <div className="w-1/6">
        <img src="./images/facebook.svg" className="mx-auto" alt="logo facebook" />
      </div>
      <div className="w-1/6">
        <img src="./images/google.svg" className="mx-auto" alt="logo google" />
      </div>
    </div>
  );
}
