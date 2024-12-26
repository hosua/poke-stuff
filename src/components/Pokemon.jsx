import { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";
import { Container, Row, Col, Card, ListGroup, Table } from "react-bootstrap";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { PuffLoader } from "react-spinners";

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
};

const GEN_OPTIONS = [
  { value: 1, label: "I (R/B/Y)" },
  { value: 2, label: "II (G/S/C)" },
  { value: 3, label: "III (R/S/E)" },
  { value: 4, label: "IV (D/P/Pt)" },
  { value: 5, label: "V (B/W)" },
  { value: 6, label: "VI (X/Y)" },
  { value: 7, label: "VII (S/M)" },
  { value: 8, label: "VIII (Sw/Sh)" },
  { value: 9, label: "IX (S/V)" },
];

const P = new Pokedex({ cacheImages: true });
const upperCaseFirstChar = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const getPokemonList = async () => {
  return await P.getPokemonsList(10);
};

export const Pokemon = ({ name }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await P.getPokemonByName(name);
        setData(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [name]);

  if (error) {
    console.error(error);
    return <></>;
  }

  if (loading) {
    return (
      <>
        <PuffLoader />
      </>
    );
  }

  return (
    <>
      <Card style={{ width: "20rem", height: "52rem" }}>
        <Card.Title>
          {`${data.id}. ${upperCaseFirstChar(data.name)}`}
        </Card.Title>
        <Card.Img src={data.sprites.front_default} />
        <div className="d-flex">
          <div style={{ minWidth: "45%" }}>
            <ListGroup>
              <ListGroup.Item variant="secondary">Type</ListGroup.Item>
              {data.types.map((item) => (
                <ListGroup.Item>
                  {`${upperCaseFirstChar(item.type.name)}`}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div style={{ margin: "auto" }} />
          <div style={{ float: "right", textAlign: "right" }}>
            <ListGroup>
              <ListGroup.Item variant="secondary">Ability</ListGroup.Item>
              {data.abilities.map((item) => (
                <ListGroup.Item>
                  {`${upperCaseFirstChar(item.ability.name)}`}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        <div className="my-2">
          <Table striped bordered hover style={{ borderRadius: "10px" }}>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Base Stat</th>
              </tr>
            </thead>
            <tbody>
              {data.stats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.stat.name.toUpperCase()}</td>
                  <td style={{ textAlign: "right" }}>{stat.base_stat}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState();
  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState(1);
  const selectedOption = GEN_OPTIONS.find(
    (option) => option.value === generation,
  );

  useEffect(() => {
    getPokemonList().then((data) => {
      setPokemonList(data);
      //console.log(data);
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
      <Row>
        {pokemonList.results
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

export default Pokemon;
