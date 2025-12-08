import React from 'react';
import {
    EarningIcon,
    RevenueIcon,
    ClosedIcon,
    AffiliatesIcon
} from '../assets/icons/StatCardIcons';
interface StatCardProps {
    title: string;
    subtitle: string;
    change: string;
    color?: string;
    iconType?: 'money' | 'revenue' | 'closed' | 'affiliates' | 'users' | 'growth' | 'default';
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    subtitle,
    change,
    color = 'text-green-600',
    iconType = 'default'
}) => {


    const getIcon = (type: string) => {
        const iconWrapper = "w-10 h-10 sm:w-12 sm:h-12 bg-green rounded-full flex items-center justify-center flex-shrink-0";

        switch (type) {
            case 'earning':
                return <div className={iconWrapper}><EarningIcon /></div>;
            case 'revenue':
                return <div className={iconWrapper}><RevenueIcon /></div>;
            case 'closed':
                return <div className={iconWrapper}><ClosedIcon /></div>;
            case 'affiliates':
                return <div className={iconWrapper}><AffiliatesIcon /></div>;
            default:
                return <div className={iconWrapper}><EarningIcon /></div>;
        }
    };

    const determineIconType = () => {
        if (iconType !== 'default') return iconType;

        const subtitleLower = subtitle.toLowerCase();
        if (subtitleLower.includes('earning') || subtitleLower.includes('revenue') || subtitleLower.includes('money'))
            return 'money';
        if (subtitleLower.includes('offer')) return 'offers';
        if (subtitleLower.includes('affiliate') || subtitleLower.includes('user') || subtitleLower.includes('client'))
            return 'affiliates';
        if (subtitleLower.includes('growth') || subtitleLower.includes('increase'))
            return 'growth';

        return 'default';
    };

    const finalIconType = determineIconType();

    return (
        <div className="flex justify-center items-center bg-white rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200 h-full flex flex-col sm:flex-row gap-3 sm:gap-4">
            {getIcon(finalIconType)}

            <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-md font-semibold text-gray-900 truncate">
                        {title}
                    </h3>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700 whitespace-nowrap self-start sm:self-center">
                        {change}
                    </span>
                </div>

                <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">{subtitle}</p>
            </div>
        </div>
    );


};

export default StatCard;
