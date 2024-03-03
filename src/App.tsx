import { requests } from "./requests";
import { Row } from "./components/Row";
import { Banner } from "./components/Banner";

const App: React.FC = () => {
  return (
    <div className="App">
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.feachNetflixOriginals}
        isLargeRow
      />
      <Row title="Top Rated_test" fetchUrl={requests.feactTopRated} />
      <Row title="Action Movies" fetchUrl={requests.feactActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.feactComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.feactHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.feactRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.feactDocumentMovies} />
    </div>
  );
};

export default App;
