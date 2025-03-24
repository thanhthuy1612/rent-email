export default function PhoneCopyComponent() {
  return (
    <div className="flex justify-between items-center w-full !border-[#009ef7] border-1 border-dashed rounded-sm px-2 py-1 bg-[#f1faff]">
      <div className="text-gray-700 text-sm ">
        Click vào Số điện thoại Code để copy nhanh |
        <button className="relative ml-2 p-2 bg-green-100 text-green-700 rounded-full shadow-md hover:bg-green-200 transition-transform transform scale-90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="butt"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M2.5 2v6h6M21.5 22v-6h-6"></path>
            <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2"></path>
          </svg>
          <span className="absolute inset-0 w-full h-full animate-ping bg-green-300 opacity-50 rounded-full"></span>
        </button>
        để thuê lại số điện thoại
      </div>
    </div>
  );
}
