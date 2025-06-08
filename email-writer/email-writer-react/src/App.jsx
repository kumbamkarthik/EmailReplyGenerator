import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import './App.css'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlesubmit = async () => {  
    setLoading(true)
    setError('')
    try{
      const response =  await axios.post("http://localhost:8081/api/email/generate",{
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2));
    }catch(err) {
      setError('Failed to generate reply. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container maxWidth="md" x={{py:4}}>
      <Typography variant="h3" component="h1" gutterBottom>Email Reply Generator</Typography>
      <Box sx={{mx:3}}>
        <TextField 
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb: 2}}
        />
        <FormControl fullWidth sx={{mb: 2}}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            onChange={(e) => setTone(e.target.value)}
            label={"Tone (Optional)"}
            sx={{mb: 2}}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Causal">Causal</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          fullWidth
          onClick={handlesubmit}
          disabled={!emailContent || loading} >
          {loading ? <CircularProgress  size={24} /> : 'Generate Reply'} 
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{mb: 2}}>
          {error}
        </Typography>
      )}
      {generatedReply && (
        <Box sx={{mt:3}}>
          <Typography variant="h6" gutterBottom>Generated Reply</Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply}
            InputProps={{ readOnly: true }}
          />
          <Button 
           variant='outlined'
           sx={{mt:2}}
           onClick={()=>navigator.clipboard.writeText(generatedReply)}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default App
