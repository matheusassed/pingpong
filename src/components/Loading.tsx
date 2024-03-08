import { CSSProperties } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material'

const Loading = () => {

  const css:CSSProperties  = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }

  return(
    <div style={css}>
      <Stack 
        sx={{color: '#F2EFEB'}}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color='inherit' size='4em' />
      </Stack>
    </div>
  )
}

export default Loading