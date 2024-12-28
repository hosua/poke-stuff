import { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Table } from "react-bootstrap";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { PuffLoader } from "react-spinners";
import { upperCaseFirstChar, getAbilityMap, getPokemonMap } from "@utils/utils";

const abilityMap = getAbilityMap();
const pokemonMap = getPokemonMap();

import Tooltip from "@components/Tooltip";

export const Pokemon = ({ name }) => {
  const [pkmn, setPkmn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPkmn = async () => {
      setPkmn(pokemonMap[name]);
      setLoading(false);
    };
    fetchPkmn();
  }, []);

  if (loading) return <PuffLoader />;

  return (
    <>
      <Card style={{ width: "20rem", height: "52rem" }}>
        <Card.Title>{`${pkmn.id}. ${upperCaseFirstChar(name)}`}</Card.Title>
        <Card.Img src={pkmn.sprites.front_default} />
        <div className="d-flex">
          <div style={{ minWidth: "45%" }}>
            <ListGroup>
              <ListGroup.Item variant="secondary">Type</ListGroup.Item>
              {pkmn["types"].map(({ type }) => (
                <ListGroup.Item>
                  {`${upperCaseFirstChar(type.name)}`}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div style={{ margin: "auto" }} />
          <div style={{ float: "right", textAlign: "right" }}>
            <ListGroup>
              <ListGroup.Item variant="secondary">Ability</ListGroup.Item>
              {pkmn.abilities.map((ability) => {
                const tooltipId = `tooltip-${name}-${ability}`;
                return (
                  <>
                    <div data-tooltip-id={tooltipId}>
                      <ListGroup.Item>
                        {`${upperCaseFirstChar(ability)}`}
                      </ListGroup.Item>
                    </div>
                    <Tooltip
                      id={tooltipId}
                      place="bottom"
                      content={abilityMap[ability]}
                    />
                  </>
                );
              })}
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
              {pkmn.stats.map((stat, index) => (
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

export default Pokemon;
