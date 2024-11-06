import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../connection/globalContext";
import ClienteHttp, { errorRequest } from "../../../connection/ClienteHttp";
import { endPoint } from "../../../types/definiciones";
import { toast } from "react-toastify";
import { Card, Row, Col, Modal, Table } from "antd";
import TableUIGroup from "../../ui/TableUIGroup";
import { caseDefaultClick } from "../../ui/GeneralMessage";

const pantallaComponente = ["SEGUIMIENTO", "SEGUIMIENTOS", "Seguimiento"];
const apiEndPoint =
  endPoint.baseURL + endPoint.modSeguimiento + endPoint.seguimiento;

// Función para enviar eventos a Google Analytics

const campoAnalytics = "Seguimiento";
const campoPrincipal = "bl";

export const TablaFlujo = () => {
  const { isLoading } = useGlobalContext();
  const [informacion, setInformacion] = useState([{}]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [infoItem, setInfoItem] = useState([]);
  const [columsImportacion, setColumsImportacion] = useState([
    {
      title: "Importaciones",
      dataIndex: "bl",
      key: "bl",
    },
  ]);

  const [columsSucursal, setColumsSucursal] = useState([
    {
      title: "Sucursales",
      dataIndex: "sucursal",
      key: "sucursal",
    },
  ]);

  //Manejador de botones en tabla para manejo de estados
  const onClickAccion = async (option, id = 0, fila = "") => {
    if (id === 0 && (option === 2 || option === 3)) {
      return 0;
    }
    isLoading(true);
    switch (option) {
      case 5: //Modificar || Leer Registro
        isLoading(true);
        setInfoItem({
          item: id,
          BLs: fila.BLs || [],
          SUCURSALES: fila.SUCURSALES || [],
        });

        setIsModalVisible(!isModalVisible);
        isLoading(false);
        break;
      default:
        isLoading(false);
        toast.warning(caseDefaultClick);
        break;
    }
  };

  //Peticion para pintar READ tabla o inpunt
  const recuperaInformacion = async (filtro) => {
    isLoading(true);
    await ClienteHttp.get(apiEndPoint + endPoint.epConsulta + filtro)
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

      <TableUIGroup
        tabla={informacion.tabla}
        onClicActions={onClickAccion}
        pantalla={pantallaComponente[1]}
        filtros={[]}
        setFiltros={[]}
        switches={[]}
        pantallaFiltros={pantallaComponente[1]}
      />
    </>
  );
};
