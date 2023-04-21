import { loader } from "../assets";

const Loader = () => {
    return (
        <div className="flex justify-center items-center py-3">
            <img src={loader} alt="loader" className='w-[40px] h-[40px] object-contain' />
        </div>
    );
}

export default Loader;