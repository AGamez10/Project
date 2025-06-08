import { Link } from 'react-router-dom';

const CategoryCard = ({ emoji, title, count, link }) => {
  return (
    <Link 
      to={link} 
      className="category-card bg-white p-6 rounded-lg shadow-md text-center transition transform hover:scale-105 dark:bg-gray-700 dark:shadow-dark"
    >
      <div className="bg-blue-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 dark:bg-blue-900">
        <span className="text-3xl">{emoji}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">+{count} disponibles</p>
    </Link>
  );
};

export default CategoryCard;