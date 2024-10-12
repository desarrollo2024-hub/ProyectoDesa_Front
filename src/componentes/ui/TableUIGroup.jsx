import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleDensePaddingButton,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useState } from "react";
import { Box, IconButton, Tooltip, Stack } from "@mui/material";
import { Form } from "react-bootstrap";
import { Space, Grid } from "antd";

const TableUIGroup = ({
  tabla,
  onClicActions,
  pantalla,
  filtros,
  setFiltros,
  switches,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();

  if (typeof tabla === "undefined") {
    return;
  }

  const exportarRegistros = (rows, columns) => {
    let visibleColumns = columns.filter(
      (column) => !column.id.startsWith("mrt-row-actions")
    );
    const visibleColumnKeys = visibleColumns.map((column) => column.id);
    // Crear un nuevo array con solo las filas filtradas y las columnas visibles
    const exportData = rows.map((row) => {
      const rowData = {};
      visibleColumnKeys.forEach((key) => {
        rowData[key] = row.getValue(key);
      });
      return rowData;
    });
    console.log("Exportando a registros", exportData);
  };

  return (
    <div className="container-table mt-3 mb-5">
      <MaterialReactTable
        columns={tabla.columnas} //Columnas
        data={tabla.data} //Información
        localization={MRT_Localization_ES} //Coloca la tabla en español
        displayColumnDefOptions={{
          "mrt-row-expand": {
            enableResizing: true,
          },
        }}
        enableExpandAll={false}
        enableExpanding={true}
        filterFromLeafRows={true}
        getSubRows={(row) => row.subRows}
        initialState={{ showGlobalFilter: true, density: "compact" }}
        paginateExpandedRows={false}
        muiExpandButtonProps={({ row, table }) => ({
          onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
          sx: {
            transform: row.getIsExpanded()
              ? "rotate(180deg)"
              : "rotate(-90deg)",
            transition: "transform 0.2s",
          },
        })}
        positionActionsColumn="first"
        onPaginationChange={setPagination}
        state={{ pagination }}
        muiTableContainerProps={{
          style: { maxHeight: "60vh", minHeight: "50vh" },
        }}
      />
    </div>
  );
};

export default TableUIGroup;
