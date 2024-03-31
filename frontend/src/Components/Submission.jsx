import { Flex } from "@radix-ui/themes";
import { useState } from "react";

function Submission() {
  const [selectedFile, setSelectedFile] = useState();
  const [image, setImage] = useState("");
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();

      setImage(`https://coffee-blank-owl-368.mypinata.cloud/ipfs/${resData.IpfsHash}`);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(image);
  return (
    <>
      <label className="form-label">Choose File To Upload</label>
       <br />
       <input
         type="file"
         onChange={changeHandler}
         className='border outline-0  text-blue-800 p-10'
       />
       <br />

       
         
      <button
         type="submit"
         className="text-white bg-blue-700 ml-6 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         onClick={handleSubmission}
          >
         Upload Avatar
        </button>
    </>
  );
}

export default Submission;
