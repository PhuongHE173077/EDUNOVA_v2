import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button, IconButton, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";



const ContentSes = ({ questionSlot, assignmentSlot }: any) => {


  return (
    <Container sx={{ padding: "8px", maxWidth: "500px", backgroundColor: "#e8eaf6" }}>
      <Box mb={2}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
          <InputLabel id="status-filter-label">Status Filter</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            label="Status Filter"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={0}>Not Started</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Finished</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f8f8f8",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "6px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        <QuestionAnswerIcon sx={{ marginRight: "6px", color: "orange", fontSize: "1.5rem" }} />
        <Box flex="1">
          <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "1rem" }}>
            Question 1
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
            abc
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'green',
              fontWeight: "bold",
              fontSize: "0.75rem",
            }}
          >
            Not Started
          </Typography>
        </Box>
        <Button
          size="medium"
          variant={"outlined"}
          color={'secondary'}

        >
          Restart
        </Button>
        <IconButton >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f0f8ff",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "6px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        <AssignmentTurnedInIcon sx={{ marginRight: "6px", color: "purple", fontSize: "1.5rem" }} />
        <Box flex="1">
          <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "1rem" }}>
            Assignment 1
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
            abc
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "gray",
              fontWeight: "bold",
              fontSize: "0.75rem",
            }}
          >
            Finish
          </Typography>
        </Box>
        <Button
          size="medium"
          variant={"outlined"}
          color={"secondary"}

        >
          Restart
        </Button>
        <IconButton >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* Modals */}
      {/* <QuestionSlotUpdate
          open={openQuestionModal}
          question={selectedQuestion}
          onClose={() => setOpenQuestionModal(false)}
          onSave={(updatedQuestion) => {
            setQuestionsslotStatus((prevQuestions) =>
              prevQuestions.map((qs) =>
                qs.QuestionID === updatedQuestion.QuestionID ? updatedQuestion : qs
              )
            );
            setOpenQuestionModal(false);
          }}

        />
      )}
      {openAssignmentModal && selectedAssignment && (
        <AssignmentSlotUpdateModal
          open={openAssignmentModal}
          assignment={selectedAssignment}
          onClose={() => setOpenAssignmentModal(false)}
          onSave={(updatedAssignment) => {
            setAssignmentsslotStatus((prevAssignments) =>
              prevAssignments.map((asm) =>
                asm.AssignmentID === updatedAssignment.AssignmentID ? updatedAssignment : asm
              )
            );
            setOpenAssignmentModal(false);
          }}
        />
      )} */}
    </Container>
  );
};

export default ContentSes;
