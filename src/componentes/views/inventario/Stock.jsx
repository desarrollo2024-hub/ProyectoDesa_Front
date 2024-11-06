import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../connection/globalContext";
import ClienteHttp, { errorRequest } from "../../../connection/ClienteHttp";
import { endPoint } from "../../../types/definiciones";
import { Card, Row, Col } from "antd";
import TableUI from "../../ui/TableUI";

const pantallaComponente = ["STOCK", "STOCK", "Stock"];

// Función para enviar eventos a Google Analytics

const campoAnalytics = "Stock";

export const Stock = () => {
  const { isLoading } = useGlobalContext();
  const [informacion, setInformacion] = useState([{}]);

  //Peticion para pintar READ tabla o inpunt
  const recuperaInformacion = async (filtro) => {
    isLoading(true);
    await ClienteHttp.get(
      endPoint.baseURL +
        endPoint.modInventario +
        endPoint.stock +
        endPoint.epConsulta +
        filtro
    )
      .then(({ data }) => {
        setInformacion(data.respuesta);
      })
      .catch((error) => {
        errorRequest(error);
      })
      .finally(() => isLoading(false));
  };

  //Ejecutar peticion cada vez que cambie un filtro de tabla
  useEffect(() => {
    const pintaUsuarioFiltros = async () => {
      await recuperaInformacion("A");
    };
    pintaUsuarioFiltros();
  }, []);

  return (
    <>
      <Card style={{ width: "100%", backgroundColor: "#011d38", border: 0 }}>
        <Row align="middle" justify="space-between">
          <Col xs={24} style={{ textAlign: "center" }}>
            <h3>{pantallaComponente[1]}</h3>
          </Col>
        </Row>
      </Card>

      <TableUI
        tabla={informacion.tabla}
        onClicActions={""}
        pantalla={pantallaComponente[1]}
        filtros={""}
        setFiltros={""}
        switches={""}
        pantallaFiltros={pantallaComponente[1]}
      />
    </>
  );
};
