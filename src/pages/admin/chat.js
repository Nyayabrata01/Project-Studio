import React from 'react'
import theme from "../../../trc/theme/theme";
import FullLayout from "../../../trc/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import ComingSoon from './ComingSoon';

const Chats = () => {
 
  return (
    <>
      <ThemeProvider theme={theme}>
       <FullLayout>
       <style jsx global>{`
        .footer {
          display:none;
        }
        .Navbar{
          display:none;
        }
      `}</style>
     
       <div className='h-full w-full'>
     </div>
     <ComingSoon/>
        </FullLayout>
      </ThemeProvider> 
      </>
  )
}

export default Chats