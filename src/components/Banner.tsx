import { useEffect, useState } from "react";
import { client, isAxiosError } from "../axios";
import { requests } from "../requests";
import Box from "@mui/material/Box";
import "./Banner.scss";

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
};

export const Banner = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const request = await client.get(requests.feachNetflixOriginals);
        if (request.data.results !== null) {
          setMovies(request.data.results);
          console.log(request.data.results);
        }
      } catch (err) {
        if (isAxiosError(err)) {
          const message = `エラーが発生しました: ステータスコード ${err.response?.status}`;
          setError(message);
        } else {
          setError("不明なエラーが発生しました");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const truncate = (str: string, maxLength: number, suffix: string = "...") => {
    return str.length <= maxLength
      ? str
      : str.substring(0, maxLength - suffix.length) + suffix;
  };

  const bannermovie = movies[Math.floor(Math.random() * movies.length)];

  return (
    <div>
      {loading ? (
        <Box sx={{ width: "100vw", maxWidth: "100%", height: "448px" }}></Box>
      ) : error ? (
        error
      ) : movies.length > 0 ? (
        <div>
          <header
            className="Banner"
            style={{
              backgroundSize: "cover",
              backgroundImage: `url("https://image.tmdb.org/t/p/original${bannermovie.backdrop_path}")`,
              backgroundPosition: "center center",
            }}
          >
            <div className="Banner-contents">
              <h1 className="banner-title">
                {bannermovie.title ||
                  bannermovie.name ||
                  bannermovie.original_name}
              </h1>
              <div className="Banner-buttons">
                <button className="Banner-button">Play</button>
                <button className="Banner-button">My List</button>
              </div>

              <h1 className="Banner-description">
                {truncate(bannermovie.overview, 150)}
              </h1>
            </div>

            <div className="Banner-fadeBottom" />
          </header>
        </div>
      ) : (
        <Box sx={{ width: "100vw", maxWidth: "100%", height: "448px" }}></Box>
      )}
    </div>
  );
};
