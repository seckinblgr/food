import Trash from "/src/components/icons/Trash";
import Plus from "../icons/Plus";
import ArrowDown from "/src/components/icons/ArrowDown";
import ArrowUp from "/src/components/icons/ArrowUp";
import { useState } from "react";

const MenuItemPriceProps = ({ name, props, addLabel, setProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const addProp = (e) => {
    e.preventDefault();
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  };

  const editProp = (e, index, prop) => {
    const newValue = e.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  };

  const removeProp = (indexToRemove) => {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  };

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className=" inline-flex p-1 justify-start border-0 items-center gap-2 mb-2"
        type="button"
      >
        {isOpen && <ArrowUp className="h-4 w-4 " />}

        {!isOpen && <ArrowDown className="h-4 w-4 " />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
      {props?.length > 0 &&
        props.map((size, index) => (
          <div className="flex gap-2 items-end" key={size.index}>
            <div>
              <input
                className="h-9"
                type="text"
                placeholder="Size Name"
                value={size.name}
                onChange={(e) => editProp(e, index, "name")}
              ></input>
            </div>
            <div>
              <input
                className="h-9"
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={(e) => editProp(e, index, "price")}
              ></input>
            </div>
            <div>
              {" "}
              <button
                onClick={() => removeProp(index)}
                type="button"
                className="bg-white mb-4 px-2 hover:text-white hover:bg-red-400 transition-all "
              >
                <Trash className="h-4 w-4  " />
              </button>
            </div>
          </div>
        ))}
      <button
        type="button"
        onClick={addProp}
        className="bg-white border  mx-auto text-sm font-medium flex justify-center items-center"
      >
        <Plus clasname="w-4 h-4" />
        <span>{addLabel}</span>
      </button>
      </div>
    </div>
  );
};

export default MenuItemPriceProps;
