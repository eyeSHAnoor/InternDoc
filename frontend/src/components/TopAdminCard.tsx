import React from "react";

interface TopAdminCardProps {
    name: string;
    role?: string;
    noticesReviewed: number;
    avatarUrl?: string;
    avatarBg?: string; // optional dynamic background color
}

const TopAdminCard: React.FC<TopAdminCardProps> = ({
    name,
    role = "Admin",
    noticesReviewed,
    avatarUrl,
    avatarBg = "bg-yellow-200"
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 ">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold ">Top Admin</h3>
                <p className="text-xs font-semibold">View All</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-transform hover:scale-[1.02] duration-200">
                {/* Avatar and Name */}
                <div className="flex flex-col items-center gap-2">
                    <div className={` h-20 w-20 rounded-full overflow-hidden flex items-center justify-center ${avatarBg}`}>
                        {avatarUrl ? (
                            <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-gray-600 text-xl font-semibold">{name.charAt(0)}</span>
                        )}
                    </div>
                    <h4 className="text-gray-900 font-semibold text-md">{name}</h4>
                    <p className="text-gray-500 text-sm ">{role}</p>
                </div>

                {/* Stats */}
                <div className="flex-1 w-full sm:w-auto flex flex-col justify-end h-[120px] gap-2">
                    <div className="bg-gray-100 px-4 py-4 rounded-lg">
                        <p className="text-gray-700 text-xs font-medium flex justify-between">
                            Notices Reviewed
                            <span>{noticesReviewed.toLocaleString()}</span>
                        </p>
                    </div>

                    {/* Action Button */}
                    <button className="mt-2 sm:mt-0 w-full sm:w-auto bg-green hover:bg-green-200 text-green-800 font-medium px-4 py-2 rounded-lg transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopAdminCard;
