import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
function Posts() {
  const [list, setList] = useState([]);
  const [addList, setAddList] = useState({
    list: "",
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const API = "https://68219a00259dad2655afc151.mockapi.io/List";

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    axios.get(API).then((response) => {
      setList(response.data);
      setLoading(false);
    });
  }, []);
  const handleAddList = () => {
    if (!addList.list) {
      setError("Please fill all the fields");
      return;
    }

    axios
      .post(API, {
        list: addList.list,
      })
      .then((response) => {
        setAddList(response.data);
        setSuccess("List added successfully");
        setList((prevPosts) => [...prevPosts, addList]);
        setAddList({ list: "" });
        setTimeout(() => {
          setSuccess("");
        }, 1500);
      });
  };
  const filteredList = list.filter((item) =>
    item.list.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    axios.delete(`${API}/${id}`).then(() => {
      setList((prevPosts) => prevPosts.filter((item) => item.id !== id));
      setSuccess("List deleted successfully");
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-100 px-5 md:px-5 lg:px-25 py-5">
        <h1 className="">Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-96 z-51"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-96 z-51"
        >
          {success}
        </Alert>
      )}

      <div className="flex flex-col justify-center items-center  bg-neutral-100 px-5 md:px-5 lg:px-25 py-5">
        <div className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-md">
          <h1>Add a New List</h1>
          <input
            className=" focus:border-blue-500   p-2 rounded-lg border border-gray-300"
            value={addList.list}
            type="text"
            placeholder="Name of the Character"
            onChange={(e) => setAddList({ ...addList, list: e.target.value })}
          />
          <button
            onClick={() => handleAddList()}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:transition-none cursor-pointer disabled:opacity-50"
          >
            Add List
          </button>
        </div>
        <h1 className="text-2xl font-bold w-full border-b pb-2">Posts</h1>
        <div className="w-full flex justify-center pt-5">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search posts..."
            className="p-2 h-13 rounded-lg transition duration-300 focus:shadow focus:shadow-blue-500/50 w-12/12 md:w-10/12 lg:w-9/12 bg-white focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 py-5 w-full px-5 md:px-20 lg:px-30">
          {filteredList.length === 0 && (
            <div className="flex items-center justify-center col-span-2">
              <h1 className="text-lg md:text-2xl lg:text-4xl font-bold">
                No list found
              </h1>
            </div>
          )}
          {[...filteredList].reverse().map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white  w-full rounded-lg shadow-md gap-2 pb-3 hover:shadow-lg transition duration-300 cursor-pointer hover:scale-105 px-5 py-3"
            >
              <h1 className="text-lg md:text-2xl lg:text-4xl font-bold">
                {item.list}
              </h1>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:transition-none cursor-pointer disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
