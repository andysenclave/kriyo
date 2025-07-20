import React from 'react';

export interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => (
  <div className="bg-white shadow-md rounded-lg p-6 max-w-sm">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-gray-700">{content}</p>
  </div>
);

export default Card;
