import React from "react";

export type TCategory = {
  id: number;
  name: string;
}

type TCategoryProps = {
  value: TCategory;
  onCahngeCategory: (category: TCategory) => void;
}

export const categoriesList = [
  { id: 0, name: "Все" },
  { id: 1, name: "Мясные" },
  { id: 2, name: "Вегетарианская" },
  { id: 3, name: "Гриль" },
  { id: 4, name: "Острые" },
  { id: 5, name: "Закрытые" },
];

const Categories: React.FC<TCategoryProps> = ({ value, onCahngeCategory }) => {

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((category) => (
          <li
            key={category.id}
            onClick={() => onCahngeCategory(category)}
            className={value.id === category.id ? "active" : ""}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;