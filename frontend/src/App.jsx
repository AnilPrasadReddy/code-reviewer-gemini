import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import axios from 'axios'
import Markdown from 'react-markdown'

function App() {
  const [code, setCode] = useState(`function(a,b){
             return a+b;
          }`);


  useEffect(() => {
    prism.highlightAll()
  });

  const [review, setReview] = useState('Review')

  async function reviewHandle(e) {
    const response = await axios.post('http://localhost:5656/ai/get-review', { code });
    // console.log(response.data);
    setReview(response.data);
  }

  return (
    <main className="h-[95vh] w-full flex basis-[50] gap-[0.8rem]">
      <div className="left w-full bg-[#0c0c0c] rounded-lg relative m-0 ">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            className="font-mono text-base border border-gray-300 rounded-md h-full w-full text-white bg-gray-900 p-2"
          />

        </div>
        <div onClick={reviewHandle} className="px-7 py-2 rounded-md bg-blue-300 m-2 absolute bottom-3 right-12 cursor-pointer select-none">Review</div>
      </div>
      <div className="right bg-[#1E1E1E] text-yellow-200 rounded-xl w-full overflow-auto p-4 shadow-lg border border-yellow-400 custom-scrollbar-hide transition-all duration-300 hover:shadow-yellow-500/50">
        <Markdown>
          {review}
        </Markdown>
      </div>



    </main>
  );
}

export default App;
