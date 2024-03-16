import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { client, isAxiosError } from "../axios";
import "./Row.scss";
import { Stack } from "@mui/material";

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
          const message = `データの取得に失敗しました、時間をおいて再度お試しください: Error Code ${err.response?.status}`;
          setError(message);
        } else {
          setError(
            "データの取得に失敗しました、時間をおいて再度お試しください"
          );
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
        <div className="Row">
          <h2>{title}</h2>
          <div className="Row-posters">
            {isLargeRow ? (
              <Stack
                direction={"row"}
                spacing={2}
                sx={{
                  padding: "20px",
                }}
              >
                {Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      sx={{ bgcolor: "grey.900" }}
                      variant="rectangular"
                      width={170}
                      height={250}
                    />
                  ))}
              </Stack>
            ) : (
              <Stack
                direction={"row"}
                spacing={2.5}
                sx={{
                  padding: "20px",
                }}
              >
                {Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      sx={{ bgcolor: "grey.900" }}
                      variant="rectangular"
                      width={178}
                      height={100}
                    />
                  ))}
              </Stack>
            )}
          </div>
        </div>
      ) : error ? (
        <div className="Row">
          <h2>{title}</h2>
          <div className="Row-posters">
            <p>{error}</p>
          </div>
        </div>
      ) : movies.length > 0 ? (
        <div className="Row">
          <h2>{title}</h2>
          <div className="Row-posters">
            <Stack
              direction={"row"}
              spacing={2.5}
              sx={{
                padding: "20px",
              }}
            >
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
            </Stack>
          </div>
        </div>
      ) : (
        <div className="Row">
          <h2>{title}</h2>
          <div className="Row-posters">
            <p>データがありません</p>
          </div>
        </div>
      )}
    </div>
  );
};
