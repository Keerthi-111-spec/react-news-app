import { useState } from "react";

function NewsApp() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNews = () => {
  setLoading(true);

  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

  fetch(
    `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.articles) {
        setNews(data.articles);
      } else {
        console.log("API Error:", data);
        setNews([]);
      }

      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
};

  const styles = {
    container: {
      width: "80%",
      margin: "30px auto",
      fontFamily: "Arial",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginBottom: "20px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    image: {
    width: "100%",
    height: "auto",
    display: "block",
    },
    content: {
      padding: "15px",
    },
    button: {
      padding: "10px 18px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
      marginBottom: "20px",
    },
    loading: {
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📰 Latest News</h1>

      <button style={styles.button} onClick={getNews}>
        {news.length === 0 ? "Get News" : "Refresh News"}
      </button>

      {loading && <h3 style={styles.loading}>Loading...</h3>}

      {!loading &&
        news.map((article, index) => (
          <div key={index} style={styles.card}>
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                style={styles.image}
              />
            )}

            <div style={styles.content}>
              <h2>{article.title}</h2>

              <p>{article.description}</p>

              <p>
                <b>Source:</b> {article.source.name}
              </p>

              <p>
                <b>Published:</b>{" "}
                {new Date(article.publishedAt).toLocaleString()}
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
              >
                <button style={styles.button}>Read More</button>
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}

export default NewsApp;
