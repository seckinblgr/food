import EditableImage from "src/components/layout/EditableImage";
import { useState ,useEffect} from "react";
import MenuItemPriceProps from "./MenuItemPriceProps";

const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [price, setPrice] = useState(menuItem?.price || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraPrices, setExtraPrices] = useState(menuItem?.extraPrices || []);
  const [categories,setCategories] = useState([])
  const [category,setCategory] = useState(menuItem?.category || "")

  useEffect(() => {
    fetch("/api/categories").then(res => {
      res.json().then(categories => {
        setCategories(categories)
      })
    })
  }, [])
  

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, { image, name, description, price, sizes, extraPrices,category})
      }
      className="mt-8  max-w-md mx-auto"
    >
      <div className="flex gap-4  mb-14  items-start">
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow  ">
          <label className="-mb-4 text-gray-500 text-sm flex">Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="-mb-4 text-gray-500 text-sm flex">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className=" text-gray-500 flex -mb-4">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories?.length > 0 && categories.map(c => (
              <option key={c._id} value={c._id}> {c.name}</option>
            ))}
          </select>
          <label className="-mb-4 text-gray-500 text-sm flex">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add extra ingredients"}
            props={extraPrices}
            setProps={setExtraPrices}
          />

          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
