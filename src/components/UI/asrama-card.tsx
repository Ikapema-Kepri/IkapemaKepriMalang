import Image from 'next/image';

interface AsramaCardProps {
    image: string;
    title: string;
    address: string;
    badgeText: string;
    badgeColor: string;
    hoverColor: string;
    iconColor: string;
    decorativeGradient: string;
}

const AsramaCard: React.FC<AsramaCardProps> = ({
    image,
    title,
    address,
    badgeText,
    badgeColor,
    hoverColor,
    iconColor,
    decorativeGradient
}) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
            
            {/* Image Container */}
            <div className="relative overflow-hidden h-80">
                <Image 
                    src={image} 
                    alt={title}
                    width={500}
                    height={320}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                    <span className={`${badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                        {badgeText}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative">
                <h3 className={`text-2xl font-bold text-gray-800 mb-4 ${hoverColor} transition-colors duration-300`}>
                    {title}
                </h3>
                
                {/* Address */}
                <div className="flex items-start max-w-[80%] space-x-2 text-gray-500">
                    <svg className={`w-5 h-5 flex-shrink-0 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">
                        {address}
                    </p>
                </div>
            </div>

            {/* Decorative Element - Fixed position for all cards */}
            <div className={`absolute -bottom-2 -right-2 w-20 h-20 ${decorativeGradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
        </div>
    );
};

export default AsramaCard;