import React, { useRef, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase Config/FirebaseConfig";

import { Rating } from "primereact/rating";

const CloudCafe = () => {
  const [allcafeInfo, setAllCafeInfo] = useState([]);
  const cafeInfo = useRef([]);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(0);

  const [typeShow, setTypeShow] = useState("showAll");
  const [disableDelete, setDisableDelete] = useState(false);

  async function handleOrderData(e) {
    setTypeShow("ordershow");
    const cafeCollection = collection(db, "Cloud Cafe");
    const q = query(cafeCollection, orderBy("rating", "desc"), limit(4));

    const querySnapshot = await getDocs(q);
    cafeInfo.current = [];
    querySnapshot.forEach((doc) => {
      cafeInfo.current.push([doc.id, doc.data()]);
    });
    setAllCafeInfo(cafeInfo.current);
  }

  function getObj(title, city, rating) {
    return {
      title: title,
      city: city,
      rating: rating,
    };
  }

  async function addData() {
    try {
      if (title === "" || city === "" || rating === 0) return;

      await addDoc(collection(db, "Cloud Cafe"), getObj(title, city, rating));
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setTitle("");
    setCity("");
    setRating(0);
  }

  async function getCloudCafeData() {
    const querySnapshot = await getDocs(collection(db, "Cloud Cafe"));
    cafeInfo.current = [];
    querySnapshot.forEach((doc) => {
      cafeInfo.current.push([doc.id, doc.data()]);
    });
    setAllCafeInfo(cafeInfo.current);
    console.log("updated the content");
  }

  function handleShowData(e) {
    setTypeShow("showAll");
    getCloudCafeData();
    console.log("clicked");
  }

  function handleAddData() {
    addData();
    getCloudCafeData();
  }

  console.log("rendered");

  return (
    <div className="border-blue-600 border w-[98vw] h-[90vh] md:w-[80vw] md:h-[80vh] rounded grid grid-rows-[80px, 1fr, 100px] z-10 bg-white">
      <header className="text-2xl text-center my-5 place-self-center inline-block border-b-2 border-blue-700 font-serif">
        Cloud Café
      </header>
      <main className="my-auto">
        <div>
          <div className="grid grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-3 place-items-center my-1 border-black">
            <input
              type="text"
              placeholder="title"
              className="text-center border-black rounded focus:outline-none border-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="city"
              className="text-center border-black rounded focus:outline-none border-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="number"
              placeholder="rating"
              className="text-center border-black rounded focus:outline-none border-2"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white w-15 h-8 p-1 rounded cursor-pointer hover:border-black hover:border-2 hover:bg-white hover:text-black transition-all md:col-span-3"
              onClick={handleAddData}
            >
              Add Cafe
            </button>
          </div>

          <div className="grid grid-rows-1 grid-cols-4 place-items-center my-2 ">
            <p className="font-serif text-lg border-b-2 border-blue-500">
              Title
            </p>
            <p className="font-serif text-lg border-b-2 border-blue-500">
              City
            </p>
            <p className="font-serif text-lg border-b-2 border-blue-500">
              Rating
            </p>
          </div>

          <div className="overflow-y-auto h-[200px] grid grid-rows-1 grid-cols-[1fr, 1fr, 1fr, 100px] place-items-center my-2">
            {allcafeInfo.map((cafe, index) => {
              return (
                <div
                  className="grid grid-rows-1 grid-cols-4 place-items-center my-2"
                  key={cafe[0]}
                >
                  <p>{cafe[1].title}</p>
                  <p>{cafe[1].city}</p>
                  <Rating value={cafe[1].rating} readOnly cancel={false} />
                  <button
                    className="hover:shadow-sm hover:shadow-black p-1"
                    disabled={disableDelete}
                    onClickCapture={(e) => {
                      console.log(e.target.parentElement.id);
                      if (e.target.tagName === "svg") {
                        setDisableDelete(true);
                        deleteDoc(
                          doc(db, "Cloud Cafe", e.target.parentElement.id)
                        )
                          .then(() => {
                            console.log(
                              `deleted ${e.target.parentElement.id} successfully`
                            );
                            if (typeShow === "ordershow") {
                              handleOrderData();
                            } else {
                              handleShowData();
                            }
                            setDisableDelete(false);
                          })
                          .catch((e) => {
                            console.log(e.message);
                            setDisableDelete(false);
                          });
                      }
                    }}
                    id={cafe[0]}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 rounded-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <footer className="grid place-items-center grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 m-5">
        <button
          className="bg-blue-500 text-white w-20 h-10 px-3 py-2 rounded cursor-pointer hover:border-black hover:border-2 hover:bg-white hover:text-black box-border transition-all"
          onClick={handleShowData}
        >
          Show
        </button>
        <button
          className="bg-blue-500 text-white h-10 px-3 py-2 rounded cursor-pointer hover:border-black hover:border-2 hover:bg-white hover:text-black box-border transition-all"
          onClick={handleOrderData}
        >
          Get Order Data(4)
        </button>
      </footer>
    </div>
  );
};

export default CloudCafe;
