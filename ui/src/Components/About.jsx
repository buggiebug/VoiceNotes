import React from 'react'

function About() {
  return (
    <>
      <div className='m-10 mt-20 md:mt-28'>
        <h1 className='mb-5 text-xl'>About:</h1>
        <div className='text-gray-600'>
          <ul className=''>
            <li className='mb-2'>Here you can store your short voice clip or any music in any format.</li>
            <li className='mb-2'>The data will be uploaded on the cloud.</li>
            <li className='mb-2'>You can add your <span className='font-medium uppercase tracking-wider text-lg'>favorite</span> song to the queue.</li>
          </ul>
        </div>
        <div className='mt-16 flex justify-center items-center'>
        😎 <a href='https://0010.netlify.app/' className='underline font-medium text-blue-500'>Developer Details</a> 😎 
        </div>
      </div>
    </>
  )
}

export default About