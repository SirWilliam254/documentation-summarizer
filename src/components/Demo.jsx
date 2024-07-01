import { useState, useEffect } from "react";
import { copy, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

    const [article, setArticle] = useState({
        url: '',
        summary: ''
    });
    
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
    const [allArticles, setAllArticles] = useState([]);
    const [copiedUrl, setCopiedUrl] = useState("");

    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

      if (articlesFromLocalStorage){
        setAllArticles(articlesFromLocalStorage)
      }  
    }, []);


    const handleSubmit = async(e) => {
        e.preventDefault();
        const { data } = await getSummary({
            articleUrl: article.url
        });

        if(data?.summary){
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles]; // update the new article to the spread of the other previous articles
            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            //set articles to local storage
            localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
        }
    };

    const handleCopy = (copyUrl) => {
        setCopiedUrl(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopiedUrl(false), 5000);
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
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {allArticles.map((item, index) => (
                    <div
                    key={`link-${index}`}
                    onClick={() => setArticle(item)}
                    className="link_card"
                    > 
                        <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                            <img 
                                src={copiedUrl === item.url ? tick : copy}
                                alt="copy_icon"
                                className="w-[40%] h-[40%] object-contain"
                            />
                        </div>

                        <p className="flex-1 font-satoshi text-blue-500 font-medium text-sm truncate">{item.url}</p>
                    </div>
                ))}
            </div>


        </div>
      
            {/* Display Results */}
        <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                ) : error ? (
                    <p className="font-inter font-bold text-red text-center">
                        Oops! something went wrong.
                        <br />
                        <span className="font-satoshi font-normal text-gray-700">
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gap-3">
                            <h2 className="font-satoshi font-bold text-white text-xl">
                                Documentation <span className="orange_gradient"> Summary: </span>
                            </h2>
                            <div className="summary_box">
                                <p className="text-gray-300 font-inter font-medium text-center">{article.summary}</p>
                            </div>
                        </div>
                    )
                )}

        </div>
    </section>
  )
}

export default Demo
