import React from "react";

function  Categories({ value, onCahngeCategory }) {

  const categories = [
    { id: 0, name: "Все" },
    { id: 1, name: "Мясные" },
    { id: 2, name: "Вегетарианская" },
    { id: 3, name: "Гриль" },
    { id: 4, name: "Острые" },
    { id: 5, name: "Закрытые" },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
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
