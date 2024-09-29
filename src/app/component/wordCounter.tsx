
"use client"
import React, { ChangeEvent, useState } from "react";
import Loader from "./loader";

const WordCounter = () => {
  const [text, setText] = useState<string>("");

  //    handle onChange
  const handleOnchange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
  };

  // consut no of characters in  text
  const charactersCount = text.length;

//   count no of words in text
const wordsCount=text.trim().split(/\s+/).filter((word)=>word).length
//   handle clear input field 
 const handleClear=()=>{
    setText("")
 }

  return (
    <div className="flex justify-center h-screen items-center bg-black/20">
      <div className="max-w-[500px] w-full min-h-[300px] bg-white  shadow-2xl p-4">
        <h1 className="text-2xl font-semibold text-center  mb-3  ">
          Word Counter{" "}
        </h1>
        <div className="flex justify-around"><Loader className="bg-red-600"/><Loader className="bg-purple-600"/><Loader className="bg-yellow-600"/><Loader className="bg-white"/><Loader className="bg-black"/> <Loader className="bg-blue-600"/><Loader className="bg-green-600"/></div>
        <label className="mb-2 text-lg opacity-90 font-medium pb-4" htmlFor="#">
          Enter text ...
        </label>
        <textarea
          className="w-full rounded-lg p-2 mt-2  outline outline-1"
          rows={3}
          name="word"
          id="words"
          value={text}
          onChange={handleOnchange}
        >
          {" "}
        </textarea>
        <div className="flex justify-between mt-4 ">
          <div className="space-x-9">
            <span className="font-medium text-lg">Words :{wordsCount}</span>
            <span className="font-medium text-lg">Characters :{charactersCount}</span>
          </div>
          <button className="mr-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
