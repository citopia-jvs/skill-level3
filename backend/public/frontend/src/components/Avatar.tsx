import React from "react";

interface AvatarProps {
    firstName: string;
    lastName: string;
}

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName }) => {
    return (
        <img src={`https://robohash.org/${firstName}-${lastName}.png`} alt="User Avatar" />
    );
};

export default Avatar;
