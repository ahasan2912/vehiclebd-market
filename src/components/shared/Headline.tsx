
type HeadlineProps = {
    subtitle: string;
    title: string;
    description: string;
};

const Headline = ({ subtitle, title, description }: HeadlineProps) => {
    return (
        <div className="text-center mb-12">
            <p className="text-red-500 font-bold mb-2 text-xl">{subtitle}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
    );
};

export default Headline;