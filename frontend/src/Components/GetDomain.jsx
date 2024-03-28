import React from 'react'

const GetDomain = () => {
  return (
    <div>
         <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                      <label for="domain-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>

                        <br />                                         
                 
                  <div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Retrieve Name Service</button>
                    </div>
            </div>

            <div>                
                <p class="text-gray-500 dark:text-gray-400">Domain Name : {}</p>
                <p class="text-gray-500 dark:text-gray-400">Avatar URI : {} </p>
                <p class="text-gray-500 dark:text-gray-400">Owner : {} </p>
            </div>

        </form>

    </div>
  )
}

export default GetDomain