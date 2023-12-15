import React from "react";

export default function ConfirmDeleteAcc({
  handleDeleteAccount,
  handleCancelDelete,
}) {
  return (
    <div className="z-50 fixed top-20 left-1/2 transform -translate-x-1/2 ">
      <div className="text-center flex flex-col gap-2 bg-white p-2 rounded z-50 before:bg-gray-800 before:absolute">
        <span className="text-sm lg:text-base ">
          Are you sure you want to delete your account?
        </span>
        <div className="flex justify-between">
          <span
            className="border border-red-800 hover:bg-red-800 hover:text-slate-300 px-3 text-slate-800 hover:opacity-90 cursor-pointer rounded transition-all"
            onClick={handleDeleteAccount}
          >
            Yes
          </span>
          <span
            className="border border-green-800 hover:bg-green-800 hover:text-slate-300 px-3 text-slate-800 hover:opacity-90 cursor-pointer rounded transition-all"
            onClick={handleCancelDelete}
          >
            No
          </span>
        </div>
      </div>
    </div>
  );
}
