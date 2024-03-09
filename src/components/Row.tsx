import { useEffect, useState } from "react";
import { client, isAxiosError } from "../axios";
import "./Row.scss";

const base_url = "https://image.tmdb.org/t/p/original";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const request = await client.get(fetchUrl);
        setMovies(request.data.results);
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
  }, [fetchUrl]);

  return (
    <div>
      {loading ? (
        "読込中"
      ) : error ? (
        error
      ) : movies.length > 0 ? (
        <div className="Row">
          <h2>{title}</h2>
          <div className="Row-posters">
            {movies.map((movie) => (
              <img
                key={movie.id}
                className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            ))}
          </div>
        </div>
      ) : (
        "データがありません"
      )}
    </div>
  );
};
