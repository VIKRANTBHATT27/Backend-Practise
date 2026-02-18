import { Activity, useState, useEffect } from 'react';
import { putFormData } from "../service/service.js";

function Container({ className }) {

     const [title, setTitle] = useState("");
     const [file, setFile] = useState("");
     const [response, setResponse] = useState("");
     const [flag, setFlag] = useState(false);

     const submitForm = async(e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append("title", title);
          formData.append("file", file);

          // console.log(title);
          // console.log(file);

          try {
               const response = await putFormData(formData);

               setFlag(true);
               
               if (response) {
                    console.log(response);
                    setResponse(response?.data?.msg);
               }
          } catch (error) {
               console.log(error);
               setFlag(false);
          }
     }

     useEffect(() => {
          // turn flag value to false after 5 sec
          if (flag) {
               const timer = setTimeout(() => {
                    setFlag(false);
               }, 3000);

               return () => clearTimeout(timer);  //avoiding memory leaks
          }

     }, [flag]);

     return (
          <div className={`${className} flex flex-col items-center`}>
               <Activity mode={flag ? "visible" : "hidden"}>
                    <p className='absolute text-xl -mt-10'>
                         {response}
                    </p>
               </Activity>
               <form className='border-3 border-gray-800 p-10 pb-5 bg-white shadow-2xl `}' onSubmit={submitForm}>
                    <h1 className='text-2xl underline underline-offset-4'>UPLOAD PDF FILES</h1>
                    <div className='my-5'>
                         <label htmlFor="fileName" className='mr-4'>File name:</label>
                         <input type="text" id='fileName' placeholder='File name' required className='p-2 border border-neutral-900 rounded-xl' onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                         <label htmlFor="fileSelection" className='mr-4'>File selection:</label>
                         <input type="file" name="ChooseFile" id="fileSelection" accept='application/pdf' required className='bg-gray-100 border border-neutral-500 p-2 cursor-pointer rounded-xl' onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                    <div>
                         <button type="submit" className='relative text-lg bg-stone-300 p-2 rounded-md border border-neutral-800 mt-10 left-[80%] cursor-pointer'>Upload</button>
                    </div>
               </form>
          </div>
     )
}

export default Container