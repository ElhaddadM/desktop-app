"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
export default function Login() {
    const router = useRouter()

useEffect(()=>{
    document.getElementById('my_modal_2').showModal()
},[])
  return (
    <div
    className="hero min-h-screen"
    style={{
    //   backgroundImage: `url(${backgroundImage.src ? backgroundImage.src : backgroundImage})`,
    backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxE4Lm7IzbSLh6vBJe0q0RAT0BizWFBcMQCw&s)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
      <dialog id="my_modal_2" className="modal">
  <div className="modal-box  shadow-2xl">

    <div className="card bg-base-100 w-full ">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={()=>{  router.push('/home') }} >Login</button>
        </div>
      </form>
  
    

    </div>
    <div className="modal-action">
       {/* <form method="dialog"> */}
        {/* if there is a button in form, it will close the modal */}
        {/* <button className="btn">Close</button> */}
      {/* </form>  */}
    </div>
  </div>
</dialog>
      </div>
    </div>


    

  </div>
  )
}
