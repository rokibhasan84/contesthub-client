import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="bg-gray-900 text-white py-6 text-center">
      <div>
          <Link to="/" className="text-lg md:text-3xl font-bold text-accent text-center gap-2">
                  {/* <img src={logo} alt="" className='w-10 rounded-full'/> */}
                  Compete<span className="ml-[-1px] text-[#dfac07]">Zone</span>
                  </Link>
      </div>
      
      <p>© 2025 CompeteZone — All Rights Reserved</p>
      <div className="flex justify-center gap-4 mt-2">
        <a>Facebook</a>
        <a>LinkedIn</a>
      </div>
    </div>
  );
}