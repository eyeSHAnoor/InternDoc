import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    color?: string; // add color prop
    className?: string;
}

// Earning Icon with dynamic color
export const TopsUser: React.FC<IconProps> = ({
    size = 20,
    color = "#85BA49", // default color
    className,
    ...props
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
    >
        <path
            d="M9.86667 10.0001C12.1372 10.0001 13.9778 8.1346 13.9778 5.83341C13.9778 3.53223 12.1372 1.66675 9.86667 1.66675C7.59616 1.66675 5.75555 3.53223 5.75555 5.83341C5.75555 8.1346 7.59616 10.0001 9.86667 10.0001Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16.9295 18.3333C16.9295 15.1083 13.764 12.5 9.86666 12.5C5.96932 12.5 2.80377 15.1083 2.80377 18.3333"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
