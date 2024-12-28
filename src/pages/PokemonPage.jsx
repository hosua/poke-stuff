import { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Table } from "react-bootstrap";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { PuffLoader } from "react-spinners";
import { Pokemon } from "@components/Pokemon";
import { getPokemonList } from "@utils/utils";

const GEN_INTERVALS = {
  1: { start: 0, end: 151 },
  2: { start: 151, end: 251 },
  3: { start: 251, end: 386 },
  4: { start: 386, end: 493 },
  5: { start: 493, end: 649 },
  6: { start: 649, end: 721 },
  7: { start: 721, end: 809 },
  8: { start: 809, end: 905 },
  9: { start: 905, end: 1025 },
  all: { start: 0, end: 1025 },
};

const GEN_OPTIONS = [
  { value: 1, label: "I (Kanto)" },
  { value: 2, label: "II (Johto)" },
  { value: 3, label: "III (Hoenn)" },
  { value: 4, label: "IV (Sinnoh)" },
  { value: 5, label: "V (Unova)" },
  { value: 6, label: "VI (Kalos)" },
  { value: 7, label: "VII (Alola)" },
  { value: 8, label: "VIII (Galar)" },
  { value: 9, label: "IX (Paldea)" },
  // { value: "all", label: "All" },
];

export const PokemonPage = () => {
  const [pokemonList, setPokemonList] = useState();
  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState(1);
  const selectedOption = GEN_OPTIONS.find(
    (option) => option.value === generation,
  );

  useEffect(() => {
    getPokemonList().then(({ results }) => {
      setPokemonList(results);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <>Loading Pokemon List...</>;
  }
  return (
    <>
      <Row>
        <Col sm={4} className="mb-3">
          <Card>
            <div className="d-flex">
              <div className="">
                <h5>Generation</h5>
                <Select
                  options={GEN_OPTIONS}
                  onChange={(selectedOption) =>
                    setGeneration(selectedOption.value)
                  }
                  value={selectedOption}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="m-auto">
        {pokemonList
          .slice(GEN_INTERVALS[generation].start, GEN_INTERVALS[generation].end)
          .map((pkmn) => {
            pkmn.id = pkmn.url.match(/\/(\d+)\//)[1];
            return (
              <Col className="mb-2" key={pkmn.name}>
                <Pokemon name={pkmn.name} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default PokemonPage;
