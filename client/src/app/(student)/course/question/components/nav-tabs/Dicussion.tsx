import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    Button,
    TextField,
    Typography,
    useColorScheme
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { Fragment, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
export default function Discussion() {
    const [value, setValue] = useState<string>("");
    const { mode } = useColorScheme()
    return (
        <Fragment>

            <Box>

                <Box
                    sx={{
                        maxWidth: "750px",
                        margin: "20px auto",
                        padding: "30px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h6" sx={{ marginBottom: "12px", fontWeight: "600" }}>
                        Add a comment
                    </Typography>
                    <Box
                        data-color-mode={mode}
                        sx={{
                            backgroundColor: "#f4f6f8",
                            borderRadius: "12px",
                            p: 2,
                            mb: 3,
                            transition: "box-shadow 0.3s ease",
                            "& .w-md-editor-toolbar": {
                                backgroundColor: "#f4f6f8",

                                '& button': {
                                    color: "#1c1e21",
                                }
                            },
                            "& ul:nth-of-type(2)": {
                                display: "none",
                            },
                        }}
                    >
                        <MDEditor
                            value={value}
                            onChange={setValue}
                            previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
                            preview="edit"
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                color: "#1c1e21",
                            }}
                        />
                    </Box>


                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
                        {/* {editingCommentId ? (
                            <>
                                <Button >{t('cancel1')}</Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isCommentDisabled}
                                    color="secondary"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                >
                                    save
                                </Button>
                            </>
                        ) : ( */}
                        <Button

                            variant="contained"
                            sx={{
                                backgroundColor: "#b0bec5",
                            }}
                            endIcon={<SendIcon />}
                            onClick={() => {
                                console.log(value);
                            }}
                        >
                            Send
                        </Button>

                    </Box>
                </Box>

            </Box>

            <Typography variant="h6" sx={{ margin: "1rem", fontWeight: "bold", color: "#3f51b5" }}>
                Your Comments
            </Typography>

            {/* {filteredComments.map((answer) => (
                <Paper
                    key={answer.id}
                    elevation={3}
                    sx={{
                        marginBottom: "10px",
                        padding: "15px",
                        borderRadius: "12px",
                        backgroundColor: "#f9f9f9",
                        position: "relative",
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Comment
                        userIds={answer?.UserID}
                        username={getUsernameById(answer?.UserID)}
                        rating={answer?.Rating}
                        text={answer?.comment}
                        questionID={answer?.QuestionID}
                        timestamp={answer?.Timestamped}
                        answerId={answer?.id}
                        settingStatus={settingStatus}
                    />

                    {answer.UserID === userid && (
                        <IconButton
                            aria-label="more"
                            onClick={(event) => handleMenuOpen(event, answer?.id)}
                            sx={{ position: "absolute", top: 10, right: 10, color: "#3f51b5" }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    )}

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedCommentId === answer.id}
                        onClose={handleMenuClose}
                    >
                        {answer.UserID === userid && (
                            <>
                                <MenuItem onClick={() => handleEditComment(answer.id)}>{t('edit')}</MenuItem>
                                <MenuItem onClick={() => handleDeleteComment(answer.id)}>{t('delete1')}</MenuItem>
                            </>
                        )}
                    </Menu>
                </Paper>
            ))} */}
        </Fragment>
    )
}
