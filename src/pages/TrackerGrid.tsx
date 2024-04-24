import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
  GridCellParams,
  GridEditInputCell,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

import "./TrackerGrid.css";
import styles from "../app/page.module.css";
import { TextField, Typography } from "@mui/material";

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: "Hải Đăng",
    outsideTalk: 0,
    smileLoudly: 0,
    outsideWork: 0,
    botherOthers: 0,
  },
  {
    id: randomId(),
    name: "An Nhiên",
    outsideTalk: 1,
    smileLoudly: 0,
    outsideWork: 0,
    botherOthers: 0,
  },
  {
    id: randomId(),
    name: "Phước Khánh",
    outsideTalk: 1,
    smileLoudly: 1,
    outsideWork: 1,
    botherOthers: 0,
  },
  {
    id: randomId(),
    name: "Thế Bảo",
    outsideTalk: 1,
    smileLoudly: 1,
    outsideWork: 1,
    botherOthers: 1,
  },
  {
    id: randomId(),
    name: "Minh Quân",
    outsideTalk: 1,
    smileLoudly: 1,
    outsideWork: 1,
    botherOthers: 5,
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: "",
        sideTalk: "",
        smileLoudly: "",
        outsideWork: "",
        botherOthers: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Thêm học trò
      </Button>
    </GridToolbarContainer>
  );
}

export default function TrackerGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  function calculateTotalPenalties(row: any): number {
    const outsideTalk = row.outsideTalk || 0;
    const smileLoudly = row.smileLoudly || 0;
    const outsideWork = row.outsideWork || 0;
    const botherOthers = row.botherOthers || 0;
    return outsideTalk + smileLoudly + outsideWork + botherOthers;
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Tên", width: 180, editable: true },
    {
      field: "outsideTalk",
      headerName: "Nói chuyện riêng",
      type: "number",
      width: 180,
      align: "center",
      headerAlign: "center",
      editable: true,
      flex: 1,
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            min: 0,
          }}
        />
      ),
    },
    {
      field: "smileLoudly",
      headerName: "Cưòi lớn tiếng",
      type: "number",
      width: 180,
      align: "center",
      headerAlign: "center",
      editable: true,
      flex: 1,
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            min: 0,
          }}
        />
      ),
    },
    {
      field: "outsideWork",
      headerName: "Làm việc riêng",
      type: "number",
      width: 180,
      align: "center",
      headerAlign: "center",
      editable: true,
      flex: 1,
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            min: 0,
          }}
        />
      ),
    },
    {
      field: "botherOthers",
      headerName: "Chọc ghẹo bạn",
      type: "number",
      width: 180,
      align: "center",
      headerAlign: "center",
      editable: true,
      flex: 1,
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            min: 0,
          }}
        />
      ),
    },
    {
      field: "appraisal",
      headerName: "Đánh giá",
      headerAlign: "center",
      align: "center",
      width: 220,
      editable: false,
      flex: 1,
      valueGetter: (value, row, column, apiRef) => {
        if (row.isNew) {
          return "";
        }
        const totalPenalties = calculateTotalPenalties(row);

        switch (totalPenalties) {
          case 0:
            return "Tập trung tốt";
          case 1:
            return "Tập trung";
          case 2:
            return "Chưa tập trung";
          case 3:
            return "Cần nhắc nhở";
          default:
            return "Kiểm diểm";
        }
      },
      cellClassName: (params: GridCellParams<typeof rowModesModel>) => {
        const totalPenalties = params.value;
        switch (totalPenalties) {
          case "Tập trung tốt":
            return "green";
          case "Tập trung":
            return "blue";
          case "Chưa tập trung":
            return "yellow";
          case "Cần nhắc nhở":
            return "orange";
          case "Kiểm diểm":
            return "red";
          default:
            return "";
        }
      },
    },
    {
      field: "stickerPenalty",
      headerName: "Trừ sticker",
      type: "number",
      width: 80,
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
      valueGetter: (value, row, column, apiRef) => {
        if (row.isNew) {
          return;
        }
        const totalPenalties = calculateTotalPenalties(row);
        const stickerPenalty = Math.max(totalPenalties - 3, 0);
        return stickerPenalty;
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center"
      ,
      width: 100,
      cellClassName: "actions",
      flex: 1,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className={styles.main}>
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <Typography variant="h2" align="center" fontWeight="bold" mb={5}>
          BẢNG THEO DÕI HOẠT ĐỘNG TRONG GIỜ HỌC
        </Typography>

        <div style={{ display: "flex", alignItems: "center", width: "100%", marginBottom:20}}>
          <Typography variant="h4" style={{ marginRight: "10px" }}>
            Lớp:
          </Typography>
          <TextField id="nameOfClass" variant="outlined" />

          <div style={{ flexGrow: 1 }} />

          <Typography variant="h4" align="right">
            Ngày: {new Date().toLocaleDateString("en-GB")}
          </Typography>
        </div>

        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar as GridSlots["toolbar"],
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          hideFooter
          autoHeight={true}
        />
        <Typography variant="h6" mt={5}>
          *Mong quý phụ huynh hợp tác nhắc nhở các em để buổi học thêm hiệu quả
        </Typography>
      </Box>
    </div>
  );
}
