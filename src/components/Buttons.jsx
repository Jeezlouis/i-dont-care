import React from 'react'

const Buttons = (button) => {
  return (
    <div>
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            {button}
          </button>
    </div>
  )
}

export default Buttons