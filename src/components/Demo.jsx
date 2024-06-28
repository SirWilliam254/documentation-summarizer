import { useState, useEffect } from "react";
import { copy, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

    const [article, setArticle] = useState({
        url: '',
        summary: ''
    });

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    const handleSubmit = async(e) => {
        alert('submitting...');
    };

  return (
    <section className="mt-16 w-full max-w-xl">
        {/* Search */}
        <div className="flex flex-col w-full gap-2">
            <form
            className="relative flex justify-center item-center"
            onSubmit={handleSubmit}
            >
            <h2 className="absolute left-0 my-2 ml-3 w-5">
            🔗
            </h2>

            <input 
                type="url"
                placeholder="Paste Url here"
                value={article.url}
                onChange={(e) => setArticle({...article, url: e.target.value })}
                required
                className="url_input peer"
            />

            <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            >
                ↵
            </button>
            </form>

                {/* Browser History */}
        </div>
      
            {/* Display Results */}
    </section>
  )
}

export default Demo
