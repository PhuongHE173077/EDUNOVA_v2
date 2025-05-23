import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Avatar, Typography, Box, Divider
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";


const ListStudent = ({ participants, classes }: any) => {
  const queryParams = new URLSearchParams(location.search);
  const classid = queryParams.get("classid");






  return (
    <Box sx={{ padding: 3 }}>

      <Box
        mb={4}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 4,
          p: 3,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {/* Class Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            Class
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              color: "text.secondary",
              bgcolor: "primary.light",
              px: 2,
              py: 0.5,
              borderRadius: 2,
            }}
          >
            4 Students
          </Typography>
        </Box>

        <Divider sx={{ my: 2, borderColor: "divider" }} />

        {/* Student Table */}
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "background.default",
          }}
        >
          <Table stickyHeader aria-label="student table">
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "primary.main",
                  "& .MuiTableCell-root": {
                    color: "common.white",
                    fontWeight: "bold",
                  },
                }}
              >
                <TableCell></TableCell>
                <TableCell>
                  <Typography color="common.black" variant="subtitle2" fontWeight="bold">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="common.black" variant="subtitle2" fontWeight="bold">
                    ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="common.black" variant="subtitle2" fontWeight="bold">
                    Email
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow

                hover
                sx={{
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <TableCell width="5%">
                  <Avatar
                    src={""}
                    sx={{
                      bgcolor: "primary.light",
                      width: 32,
                      height: 32,
                      fontSize: "14px",
                    }}
                  >
                    <GroupIcon fontSize="small" />
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    Do dang Phuong
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    123
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    mail
                  </Typography>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </Box>


    </Box>
  );
};

export default ListStudent;
