import { useState } from "react";


const RegisterENS = () => {
   
return (
    <div>
        
        <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                      <label 
                            for="first_name" 
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Domain name
                        </label>

                        <input 
                            type="text" 
                            id="first_name" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <br />
                    
                    <div>
                       <label 
                            for="last_name" 
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar URI</label>
                        <input 
                            type="text" 
                            id="last_name" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                        </div>

                        <br />
                        
                        <div>    
                        <div class="flex items-start mb-6">
                        <div class="flex items-center h-5">
                        <input 
                            id="remember" 
                            type="checkbox" 
                            value="" 
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    
                        {/* <input type="file" onChange={changeHandler} /> */}
                    
                    </div>
                    <button type="submit" 
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >Register Name Service
                    </button>
                    </div>
            </div>

        </form>

    </div>
  )
}


export default RegisterENS