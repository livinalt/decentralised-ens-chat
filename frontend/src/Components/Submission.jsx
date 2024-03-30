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
      <div justify={"between"}>
        <img className="w-10 h-10 rounded-full" src={image} alt="Rounded avatar" />
      
      <label className="form-label"> Choose File To Upload</label>
      <br/>
      <input 
      type="file"   
      onChange={changeHandler} />
      <br />
      <button 
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={handleSubmission}
      >Submit</button>
      </div>
    </>
  );
}

export default Submission;
