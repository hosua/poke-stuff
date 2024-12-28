import { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Table } from "react-bootstrap";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { PuffLoader } from "react-spinners";
import {
  PokeAPI,
  upperCaseFirstChar,
  getAbilityByName,
  getAbilityMap,
} from "@utils/utils";

const abilityMap = getAbilityMap();

import Tooltip from "@components/Tooltip";

export const Pokemon = ({ name, abilities }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await PokeAPI.getPokemonByName(name);
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
              {data.abilities.map((item) => {
                const { ability } = item;
                const { name } = ability;
                const tooltipId = `tooltip-${ability.name}`;
                return (
                  <>
                    <div data-tooltip-id={tooltipId}>
                      <ListGroup.Item>
                        {`${upperCaseFirstChar(name)}`}
                      </ListGroup.Item>
                    </div>
                    <Tooltip
                      id={tooltipId}
                      place="bottom"
                      content={abilityMap[name]}
                      style={{ zIndex: 69 }}
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

export default Pokemon;
