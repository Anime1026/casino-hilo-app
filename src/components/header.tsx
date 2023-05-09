import { useContext } from "react"
import { Container, Stack, Typography } from "@mui/material";
import { MyContext } from "../context/GameContext";

interface IHeaderProps { }

const Header: React.FC<IHeaderProps> = () => {

  const { funds } = useContext(MyContext);

  return (
    <Stack className="header">
      <Container>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" className="box">
          <Stack direction="column" textAlign="end">
            <Typography className="text-color">ID: 71028664</Typography>
            <Typography>
              {funds} <span className="text-color">FUN</span>
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Header;
