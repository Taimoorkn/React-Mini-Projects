import React, { useEffect, useState } from "react";
const App = () => {
  const [item, setItem] = useState("");
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (formData.length === 0) return;
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    const formDataFromLocalStorage = JSON.parse(
      localStorage.getItem("formData")
    );
    if (formDataFromLocalStorage) {
      setFormData(formDataFromLocalStorage);
    }
  }, []);
  function handleChange(event) {
    setItem(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormData((prevData) => [...prevData, { text: item, checked: false }]);
    setItem("");
  }

  function toggleChecked(index) {
    const updatedData = [...formData];

    if (updatedData[index].checked == false) {
      const [checkedItem] = updatedData.splice(index, 1);
      checkedItem.checked = !checkedItem.checked;
      updatedData.push(checkedItem);
      setFormData(updatedData);
    } else {
      const [checkedItem] = updatedData.splice(index, 1);
      checkedItem.checked = !checkedItem.checked;
      updatedData.unshift(checkedItem);
      setFormData(updatedData);
    }
  }

  function deleteItem(index) {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);
  }

  const todoList = formData.map((data, index) => (
    <div className={`todo_list ${data.checked ? "checked" : ""}`} key={index}>
      <input
        type="checkbox"
        className="checked_item"
        checked={data.checked}
        onChange={() => toggleChecked(index)}
      />
      {data.text}
      <button className="delete_btn" onClick={() => deleteItem(index)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  ));

  return (
    <main>
      <h2>ToDo List</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input_field"
          type="text"
          placeholder="Add Item"
          onChange={handleChange}
          name="formData"
          value={item}
        />
        <button className="submit_button">+</button>
      </form>
      {todoList}
    </main>
  );
};

export default App;
