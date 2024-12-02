import React from 'react';
import Link from 'next/link';
import { Articles } from '@/types/types';
import { convertDateFormat, getImageSrc } from '@/utils/sharedFunction';

interface SearchCardProps {
  article: Articles;
}

const SearchCard: React.FC<SearchCardProps> = ({ article }) => {
  return (
    <div className="flex items-start shadow-sm p-4 mt-3">
      <div className="w-1/4">
        <Link href={`/${article.id}`}>
          <img
            src={getImageSrc(article?.thumbnail as string)}
            alt={article.title}
            className="w-full h-40 object-cover"
          />
        </Link>
      </div>
      <div className="w-3/4 pl-4">
        <h2 className="text-xl font-bold mb-2">
          <Link href={`/${article.id}`} className="hover:text-sky-500">
            {article.title}
          </Link>
        </h2>
        <p className="text-gray-700 line-clamp-3">{article.content}</p>
        <div className="text-sm text-gray-500 mt-2">
          <span>By {article.User.name}</span> |{' '}
          <span>{convertDateFormat(article?.published_at.toString())}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;