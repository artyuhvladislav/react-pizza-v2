import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];

export const Categories = React.memo(({ value, onClickCategory }: CategoriesProps) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((name, i) => (
          <li
            className={i === value ? 'active' : ''}
            key={i}
            onClick={() => {
              onClickCategory(i);
            }}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});
