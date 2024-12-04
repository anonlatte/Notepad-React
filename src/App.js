import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Drawer,
  InputAdornment,
  Button,
  Typography
} from '@mui/material';
import { Delete, Search } from '@mui/icons-material';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNoteChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const addNote = () => {
    if (currentNote.trim()) {
      if (currentNoteIndex !== null) {
        const updatedNotes = notes.slice();
        updatedNotes[currentNoteIndex] = currentNote;
        setNotes(updatedNotes);
      } else {
        setNotes([...notes, currentNote]);
      }
      setCurrentNote('');
      setCurrentNoteIndex(null);
    }
  };

  const editNote = (index) => {
    setCurrentNoteIndex(index);
    setCurrentNote(notes[index]);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setCurrentNote('');
    setCurrentNoteIndex(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(searchQuery)
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Сайдбар с записями */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
          <Typography variant="h6">Notes</Typography>
        </Toolbar>
        <TextField
          placeholder="Search notes"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {filteredNotes.map((note, index) => (
            <ListItem
              key={index}
              button
              onClick={() => editNote(index)}
            >
              <ListItemText primary={note.substring(0, 20)} />
              <IconButton onClick={() => deleteNote(index)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Основная часть для текстового поля */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Note Editor
            </Typography>
            <Button color="inherit" onClick={addNote}>
              {currentNoteIndex !== null ? 'Update Note' : 'Add Note'}
            </Button>
          </Toolbar>
        </AppBar>
        <TextField
          multiline
          fullWidth
          minRows={15}
          placeholder="Write your note here..."
          value={currentNote}
          onChange={handleNoteChange}
          sx={{ mt: 3 }}
        />
      </Box>
    </Box>
  );
};

export default NoteApp;
