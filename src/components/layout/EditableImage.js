import toast from "react-hot-toast";
import Image from 'next/image';

const EditableImage = ({link,setLink}) => {
    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (files?.length === 1) {
          const data = new FormData();
          data.set("file", files[0]);
    
          const uploadingPromise = new Promise(async (res, rej) => {
            const response = await fetch("/api/upload", {
              method: "POST",
              body: data,
            });
    
            if (response.ok) {
              const link = await response.json();
              setLink(link);
              res();
            } else {
              rej();
            }
          });
          await toast.promise(uploadingPromise, {
            loading: "Uploading...",
            success: "Succesfully Upload !",
            error: "Could not Upload !",
          });
        }
      };
    return (
        <>
            {link && (
                <Image
                  className="rounded-full shadow-sm shadow-black mx-auto border-2 max-w-[150px] min-h-[150px] border-red-300 mb-4"
                  width={200}
                  height={200}
                  src={link}
                  alt="avatar"
                ></Image>
              )}
              {!link && (
                <div className=" text-red-500 p-4 bg-gray-300  text-center  my-5">
                    No image !
                </div>
              )}
                <label className=" text-center items-center justify-center flex hover:bg-red-200 transition-all border-2 rounded-md cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                ></input>
                <span>Edit</span>
              </label>
        </>
    );
}

export default EditableImage