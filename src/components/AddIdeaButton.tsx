import React, { useState } from "react";
import IdeaForm from "./IdeaForm";

const AddIdeaButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-neutral-700 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-gray-600 transition duration-200"
        onClick={() => setIsOpen(true)}
      >
        ＋
      </button>

      <IdeaForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AddIdeaButton;
