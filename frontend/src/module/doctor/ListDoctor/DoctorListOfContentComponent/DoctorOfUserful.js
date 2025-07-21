
import React from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';


const Listdata = [
    {
        id: 1,
        title: 'Guide to connecting Medical Profile and Video call on Clinicmate website',
        img: "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg"
    },
    {
        id: 2,
        title: 'Guide to connecting Medical Profile and Video call on Clinicmate website',
        img: "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg"
    },
    {
        id: 3,
        title: 'Guide to connecting Medical Profile and Video call on Clinicmate website',
        img: "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg"
    },
    {
        id: 4,
        title: 'Guide to connecting Medical Profile and Video call on Clinicmate website',
        img: "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg"
    },
]

function DoctorOfUserful() {
    return (
        <div className='w-[100%] h-[300px] rounded-3xl bg-white shadow-xl'>
            <div className="w-[100%] rounded-3xl h-[35px]">
                <h1 className="p-3 ml-1 font-bold text-3xl">Useful Information</h1>
            </div>
            <hr className="w-[90%] ml-5 text-[#d4d4d4]" />
            <div>
                {Listdata.map((data) => (
                    <div className="flex justify-around w-[100%] h-[28px] ml-2 mb-[30px]" key={data.id}>
                        <div className=" w-[25%]">
                            <img className='p-[7px] w-[100%] h-[60px]' src={data.img} alt='' />
                        </div>
                        <div className=" w-[75%]">
                            <div className="h-[45px] mt-[7px]">
                                <p className='text-[10px] pr-[10%]'>{data.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-[100%] flex pt-2 cursor-pointer'>
                <span className='w-[70%] font-normal text-xl'>
                    <h5 className='ml-[30%] mt-1 text-gradientLeft'>View all Information</h5>
                </span>
                <span className='text-[35px] text-gradientLeft w-[30%]'>
                    <MdKeyboardArrowRight />
                </span>
            </div>
        </div >
    )
}
export default DoctorOfUserful


