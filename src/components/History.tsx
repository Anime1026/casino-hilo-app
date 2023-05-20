import React, { useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { AppBar, Button, Stack } from "@mui/material";
import { CurrentGameType, GameHistoryType } from "../types/intex";
import { PercentMulti } from "../context/GameContext";
import {
  Categories,
  ColorCategories,
  HiLoCategories,
  OptionCategories,
} from "../config";

var effectFlag = false;

interface Column {
  id: "userId" | "betId" | "betAmount" | "isWin";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "userId", label: "User ID", minWidth: 100 },
  { id: "betId", label: "Combination", minWidth: 70 },
  {
    id: "betAmount",
    label: "Amount",
    minWidth: 100,
    format: (value: number) => value.toFixed(),
  },
  {
    id: "isWin",
    label: "Won",
    minWidth: 100,
  },
];

const columnsHistory: readonly Column[] = [
  { id: "betId", label: "Bet Option", minWidth: 100 },
  {
    id: "betAmount",
    label: "Bet Amount",
    minWidth: 100,
    format: (value: number) => value.toFixed(),
  },
  {
    id: "isWin",
    label: "Won",
    minWidth: 100,
    align: "right",
  },
];

export default function HistoryTable({ betHistory }: any) {
  const { socket } = useContext(PercentMulti);

  const [page, setPage] = React.useState(0);
  const [active, setActive] = React.useState(true);
  const [currentGame, setCurrentGame] = React.useState<CurrentGameType[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (effectFlag && socket) {
      socket.on(
        "real-time",
        (data: {
          time: number;
          gameHistory: GameHistoryType[];
          currentGame: CurrentGameType[];
        }) => {
          setCurrentGame(data.currentGame);
        }
      );
    } else {
      effectFlag = true;
    }
  }, [effectFlag]);

  return (
    <>
      <AppBar position="static" color="primary" className="game-history">
        <Stack
          spacing={2}
          direction="row"
          alignItems="left"
          className="history-appbar"
        >
          <Button
            variant="contained"
            className={
              active ? "current-bet-active" : "current-history-Unactive"
            }
            onClick={() => {
              setActive(true);
            }}
          >
            Current Bet
          </Button>
          <Button
            variant="contained"
            className={
              !active ? "current-bet-active" : "current-history-Unactive"
            }
            onClick={() => {
              setActive(false);
            }}
          >
            History
          </Button>
        </Stack>
      </AppBar>
      {active ? (
        <Paper sx={{ width: "100%", overflow: "hidden", m: "20px 0px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="history-table-head">
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentGame
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, key: number) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                        {columns.map((column: any) => {
                          const value = row[column.id];
                          if (column.id === "isWin") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ color: value ? "green" : "red" }}
                              >
                                {value === -1 ? "Ready!" : value}
                              </TableCell>
                            );
                          } else if (column.id === "betId") {
                            const categoriesArray = [
                              Categories,
                              ColorCategories,
                              OptionCategories,
                              HiLoCategories,
                            ];

                            for (let i = 0; i < categoriesArray.length; i++) {
                              const foundItem = categoriesArray[i].find(
                                (item) => item.id === value
                              );

                              if (foundItem) {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {foundItem.title}
                                  </TableCell>
                                );
                              }
                            }
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={currentGame.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", m: "20px 0px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead className="history-table-head">
                <TableRow>
                  {columnsHistory.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {betHistory
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, key: number) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                        {columnsHistory.map((column: any) => {
                          const value = row[column.id];
                          if (column.id === "isWin") {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ color: value ? "green" : "red" }}
                              >
                                {value === -1 ? "Ready!" : value}
                              </TableCell>
                            );
                          } else if (column.id === "betId") {
                            const categoriesArray = [
                              Categories,
                              ColorCategories,
                              OptionCategories,
                              HiLoCategories,
                            ];

                            for (let i = 0; i < categoriesArray.length; i++) {
                              const foundItem = categoriesArray[i].find(
                                (item) => item.id === value
                              );

                              if (foundItem) {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {foundItem.title}
                                  </TableCell>
                                );
                              }
                            }
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={currentGame.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
}
