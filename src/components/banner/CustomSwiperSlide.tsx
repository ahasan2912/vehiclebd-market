import Link from 'next/link';
import Button from '../shared/Button';

const CustomSwiperSlide = ({ url }: { url: string }) => {
    return (
        <div
            className="h-[90vh] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `linear-gradient(30deg, rgb(21, 21, 21), rgba(21, 21, 21, 0)),url(${`${url}`})` }}>
            <div className="container mx-auto px-6 text-white ">
                <div className='flex flex-col justify-center h-[70vh]'>
                    <h1 className='max-w-[460px] text-5xl md:text-6xl font-bold leading-[60px] sm:leading-[70px]'>Affordable Price For Car Servicing</h1>
                    <p className='max-w-[500px] my-6 sm:my-[30px] text-xl'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                    <div className='flex gap-4'>
                        <Button color={'bg-[#FF3811] hover:bg-red-500 border-[#FF3811] text-white px-5 py-3'}>Discover More</Button>
                        <Link href='/product' className='border-white text-white px-5 py-3 hover:bg-[#6f7171] border px-4 py-2 rounded  transition font-semibold sm:text-lg'>Latest Product</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomSwiperSlide;