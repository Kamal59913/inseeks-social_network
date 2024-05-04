  import React, { useState } from 'react'
  import PulseLoader from "react-spinners/PulseLoader";
  import axios from 'axios'

  export function PostAnyThing(props) {
    const postAnythingUrl = "http://localhost:8000/api/v1/createpost/generalpost"

    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');
    const [image, setimage] = useState(null);
    const [loader, setLoader] = useState(false)

    //putting it all in a json variable
    const handleImageChange = (e) => {
      console.log(e.target.files[0])
        setimage(e.target.files[0]);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoader(true)
      console.log("Clicked")
      let formData = new FormData()
      formData.append('title',title)
      formData.append('description',description)
      formData.append('image',image)
      if(props.envname) {
        formData.append('envname',props.envname)
      } else {
        formData.append('envname',"")
      }
      console.log(formData)
      axios.post(postAnythingUrl, formData , {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, 
        withCredentials: true
      })
      .then((res) => {
        if(res.data.statusCode === 200 && res.data.success === true)
        { 
          console.log("Successfully sent to the server")
          props.updatepost(res.data.data)
          setLoader(false)
          props.changetoggleany()
        }
      })
      .catch((err) => {
        console.log(err)
      })

    }
    return (
      <div className="absolute rounded-md bg-slate-600 p-2 w-full h-screen flex items-center justify-center bg-opacity-25">
        <div className="relative flex justify-center bg-white px-4 py-4 sm:px-6 sm:py-16 lg:px-8 w-[460px] rounded-md">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <i className='fa-solid fa-backward absolute ml-[400px] text-slate-600' onClick={props.changetoggleany}></i>
            <h2 className="text-2xl font-bold leading-tight text-slate-600 mt-3">Share Anything You Like</h2>
            <form action="#" onSubmit={handleSubmit} method="POST" className="mt-2">
              <div className="space-y-3">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                  </label>
                  <div className="">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Heading of the Post(Optional)"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                    </label>
                  </div>
                  <div className="mt-2">
                    <textarea
                      className="flex min-h-10 max-h-20 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Description(Required)"
                      value={description}
                      onChange={(e)=> setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className='mt-3'>
                  <p className='inline-flex font-semibold text-lg'>Add</p>
                  <label
                    htmlFor="imageupload"
                    className="imagecheck inline-flex items-center justify-center rounded-md bg-slate-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 ml-4"
                  >
                  <i className='fa-solid fa-image'></i>
                  </label>
                  <input id="imageupload" type="file" className="hidden imagecheck" multiple  accept="image/*"  
                  onChange={handleImageChange}
                  />
                  {
                    loader && <>
                      <span className='ml-2 text-slate-800'> Uploading 
                        </span>
                        <span className='ml-2'>
                        <PulseLoader color="#475569"
                            size={6}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            />
                        </span>
                    </>
                  }
                </div>
                <div className='h-[180px] w-full bg-slate-600 mt-1 flex justify-center'>
                  {image && <>
                    <img className='bg-slate-200 h-full w-64' src={URL.createObjectURL(image)} alt=''/>
                    <i className='fa-solid fa-x absolute ml-[360px] mt-3 text-slate-100' onClick={()=>setimage(null)}></i>
                  </> 
                  }
                </div>
                <button
                type="submit"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-slate-600 focus:bg-gray-100 focus:text-slate-600 focus:outline-none"
              >
                Post
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
