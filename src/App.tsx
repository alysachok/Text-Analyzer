import {
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { calculateReadability } from './TextAnalysis';
import { getDesignTokens } from './themeConfig'; // Import theme configuration

type Mode = 'light' | 'dark';

function App() {
  const [mode, setMode] = useState<Mode>('light'); // State to toggle between light and dark mode
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]); // Create a theme based on the mode
  const [text, setText] = useState(''); // State for the textarea
  const [result, setResult] = useState(''); // State to store the analysis result

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light');
  };

  const analyzeText = () => {
    setResult(calculateReadability(text));
  };

  const clearText = () => {
    setText('');
    setResult('');
  };

  const textExcerpts = [
    { text: "One fish. Two fish. Red fish. Blue fish.", grade: "Before Grade 1" },
    { text: "Would you like them here or there? I would not like them here or there. I would not like them anywhere.", grade: "Grade 2" },
    { text: "Congratulations! Today is your day. You're off to Great Places! You're off and away!", grade: "Grade 3" },
    { text: "Harry Potter was a highly unusual boy in many ways. For one thing, he hated the summer holidays more than any other time of year. For another, he really wanted to do his homework, but was forced to do it in secret, in the dead of the night. And he also happened to be a wizard.", grade: "Grade 5"},
    { text: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.", grade: "Grade 7"},
    { text: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, and what is the use of a book, thought Alice without pictures or conversation?", grade: "Grade 8"},
    { text: "There are more things in Heaven and Earth, Horatio, than are dreamt of in your philosophy.", grade: "Grade 9"},
    { text: "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.", grade: "Grade 10"},
    { text: "A large class of computational problems involve the determination of properties of graphs, digraphs, integers, arrays of integers, finite families of finite sets, boolean formulas and elements of other countable domains.", grade: "Grade 16+"}
  ]
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3">Text Readability Analyzer</Typography>
          
          <Switch checked={mode === 'dark'} onChange={handleModeChange} />
        </Box>
        
        <Typography variant="body1" paragraph>
        This aplication uses the <Link href="https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index" target="_blank" rel="noopener noreferrer">
          Coleman-Liau index 
          </Link> to determine the U.S. grade level necessary for understanding a piece of text. This tool can be valuable for educators, writers, and anyone looking to ensure their writing is accessible and understandable. By analyzing the number of letters, words, and sentences, it offers clear insight into text complexity.
        </Typography>
        <TextField
          label="Enter text to analyze"
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}> 
          <Button variant="contained" onClick={analyzeText}>
            Analyze
          </Button>
          <Button variant="contained" onClick={clearText}>
            Clear
          </Button>
        </Stack>
        {result && (
          <Typography variant="h4" gutterBottom>
            {result}
          </Typography>
        )}
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table aria-label="examples">
            <TableHead>
              <TableRow>
                <TableCell>Grade Level</TableCell>
                <TableCell>Text Examples</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {textExcerpts.map((textExcerpt, index) => (
                <TableRow key={index}>
                  <TableCell>{textExcerpt.grade}</TableCell>
                  <TableCell>{textExcerpt.text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Container component="footer" maxWidth="md" sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
          <Typography variant="body2">
            © 2024 Aleksandra. All Rights Reserved.
          </Typography>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;