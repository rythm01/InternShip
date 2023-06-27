import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Box } from "@mui/material";
import useWindowSize from "./utils/hook/useWindowSize";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const { width } = useWindowSize();
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div></div>}>
          <GoogleOAuthProvider
            clientId={
              "277059566822-bhavsugv21mrv1no82ke0kf2m971thec.apps.googleusercontent.com"
            }
          >
            <Box marginBottom={width <= 600 && "60px"}>
              <Routes>
                {routes.map((route, index) => (
                  <Route key={index} {...route}>
                    {route.routes?.map((route, index) => (
                      <Route key={index} {...route} />
                    ))}
                  </Route>
                ))}

                {/* 
                {
                  routes.map((r, index) => {
                    return (
                      <Route key={index} {...r} >
                        {
                          r.routes?.map((nestedR, index) => {
                            return (

                              nestedR.isProtected ? <PrivateRoute key={index} {...nestedR} /> : <Route key={index} {...nestedR} />
                            )
                          })
                        }
                      </Route>
                    )
                  })
                } */}
              </Routes>
            </Box>
          </GoogleOAuthProvider>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
