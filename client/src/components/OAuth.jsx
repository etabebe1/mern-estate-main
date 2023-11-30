import React from "react";

export default function OAuth() {
  const handleClick = () => {
    try {
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <button
      type="button"
      className="bg-red-900 py-2 px-2 rounded-lg uppercase text-slate-300 hover:opacity-90"
      onClick={handleClick}
    >
      Continue with google
    </button>
  );
}
