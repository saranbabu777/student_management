import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(
    ({ theme }) => `
    font-size: 16px;
    vertical-alignment: sub;
    text-decoration: none;
    color: white;
    font-size: 20px;
    margin-left: 10px;
    &:hover{ 
        color: yellow;
        border-bottom: 1px solid white;
    }
  `,
);
const StyledNav = styled('div')(
    ({ theme }) => `
    display: flex;
    margin-left: 10px;
  `,
);
const StyledLogo = styled(Typography)(
    ({ theme }) => `
    flexGrow: 1;
    cursor: pointer
  `,
);

const Navbar = () => {
    return (
        <AppBar position="static">
            <CssBaseline />
            <Toolbar>
                <StyledLogo variant="h4" >
                    Manchester Academy
                </StyledLogo>
                <StyledNav>
                    <StyledLink to="/">
                        Home
                    </StyledLink>
                    <StyledLink to="/create">
                        Create Student
                    </StyledLink>
                    <StyledLink to="/add-fees">
                        Add Fees
                    </StyledLink>
                    <StyledLink to="/fees">
                        Fees
                    </StyledLink>
                    <StyledLink to="/tournament">
                        POOL A (29/10/2022)
                    </StyledLink>
                </StyledNav>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;