"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  useMediaQuery,
  IconButton,
  Tooltip,
  Paper,
  Chip,
} from "@mui/material"
import { Computer, Smartphone, AccessTime, Refresh, Public, Info, DarkMode, LightMode } from "@mui/icons-material"
import { keyframes } from "@mui/system"

const IPDashboard = () => {
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const isMobile = useMediaQuery("(max-width:600px)")

  // Custom animations
  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  `

  const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(50, 205, 50, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(50, 205, 50, 0); }
    100% { box-shadow: 0 0 0 0 rgba(50, 205, 50, 0); }
  `

  // Theme colors based on dark/light mode
  const theme = {
    background: darkMode ? "#121212" : "#f5f5f5",
    cardBg: darkMode ? "#1e1e1e" : "#ffffff",
    primary: darkMode ? "#32CD32" : "#2e7d32",
    text: darkMode ? "#e0e0e0" : "#333333",
    secondaryText: darkMode ? "#aaaaaa" : "#666666",
    divider: darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
    cardShadow: darkMode ? "0 8px 16px rgba(0, 0, 0, 0.4)" : "0 8px 16px rgba(0, 0, 0, 0.1)",
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Device information
      const userAgent = navigator.userAgent
      const screenWidth = window.screen.width
      const screenHeight = window.screen.height
      const language = navigator.language || navigator.userLanguage
      const platform = navigator.platform
      const colorDepth = window.screen.colorDepth
      const orientation = window.screen.orientation ? window.screen.orientation.type : "unknown"
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const timestamp = new Date().toISOString()

      // API request
      const response = await fetch("https://apichris.vercel.app/web", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAgent,
          screenWidth,
          screenHeight,
          language,
          platform,
          colorDepth,
          orientation,
          windowWidth,
          windowHeight,
          timestamp,
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      setResponseData(data)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Unable to retrieve your IP information. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Check for user preference for dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(prefersDarkMode)
  }, []) // Removed darkMode from dependencies

  const formatDate = (isoString) => {
    if (!isoString) return "No disponible"
    const date = new Date(isoString)
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(date)
  }

  const InfoCard = ({ title, icon, children, delay = 0 }) => {
    // Use a ref to track if component is mounted
    const [mounted, setMounted] = useState(false)

    // Only enable animations after component is mounted
    useEffect(() => {
      setMounted(true)
    }, [])

    return (
      <Card
        sx={{
          height: "100%",
          backgroundColor: theme.cardBg,
          boxShadow: theme.cardShadow,
          borderRadius: "12px",
          overflow: "hidden",
          opacity: !loading && mounted ? 1 : 0,
          transform: !loading && mounted ? "translateY(0)" : "translateY(20px)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease",
          transitionDelay: `${delay}ms`,
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              pb: 1,
              borderBottom: `1px solid ${theme.divider}`,
            }}
          >
            <Box
              sx={{
                mr: 2,
                color: theme.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                borderRadius: "50%",
                backgroundColor: `${theme.primary}20`,
              }}
            >
              {icon}
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: theme.primary,
                fontWeight: 600,
                fontSize: isMobile ? "1rem" : "1.25rem",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ color: theme.text }}>{children}</Box>
        </CardContent>
      </Card>
    )
  }

  const InfoItem = ({ label, value }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
        flexWrap: "wrap",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: theme.secondaryText,
          mr: 2,
        }}
      >
        {label}:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 400,
          color: theme.text,
          wordBreak: "break-word",
        }}
      >
        {value || "No disponible"}
      </Typography>
    </Box>
  )

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.background,
        transition: "background-color 0.3s ease",
        pt: 4,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: theme.primary,
              fontWeight: 700,
              fontSize: isMobile ? "2rem" : "2.5rem",
              animation: `${pulse} 2s infinite`,
              textShadow: darkMode ? "0 0 10px rgba(50, 205, 50, 0.5)" : "none",
            }}
          >
            EJEMPLO PRACTICO IP DASHBOARD 
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Refresh data">
              <IconButton
                onClick={fetchData}
                disabled={loading}
                sx={{
                  color: theme.primary,
                  "&:hover": { backgroundColor: `${theme.primary}20` },
                }}
              >
                <Refresh />
              </IconButton>
            </Tooltip>

            <Tooltip title={darkMode ? "Light mode" : "Dark mode"}>
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                sx={{
                  color: theme.primary,
                  "&:hover": { backgroundColor: `${theme.primary}20` },
                }}
              >
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            backgroundColor: `${theme.primary}15`,
            borderRadius: "8px",
            border: `1px solid ${theme.primary}30`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Info sx={{ color: theme.primary, mr: 1 }} />
            <Typography variant="body2" sx={{ color: theme.text }}>
              Los datos de ubicación y geolocalización son aproximados y dependen de la información proporcionada por el
              proveedor de servicios de IP, que puede no reflejar la ubicación real del dispositivo.
            </Typography>
          </Box>
        </Paper>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "50vh",
            }}
          >
            <CircularProgress size={60} thickness={4} sx={{ color: theme.primary, mb: 2 }} />
            <Typography variant="h6" sx={{ color: theme.text }}>
              Obteniendo información...
            </Typography>
          </Box>
        ) : error ? (
          <Card
            sx={{
              p: 3,
              backgroundColor: "#fdeded",
              color: "#5f2120",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">{error}</Typography>
          </Card>
        ) : (
          responseData && (
            <Box
              sx={{
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <InfoCard title="Información IP" icon={<Public fontSize="medium" />} delay={100}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        p: 2,
                        backgroundColor: `${theme.primary}15`,
                        borderRadius: "8px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: theme.primary,
                          mr: 2,
                        }}
                      >
                        {responseData.ipInfo.ip || "No disponible"}
                      </Typography>
                      <Chip
                        label={responseData.ipInfo.country || "??"}
                        size="small"
                        sx={{
                          backgroundColor: theme.primary,
                          color: "#fff",
                          fontWeight: 500,
                        }}
                      />
                    </Box>

                    <InfoItem label="Hostname" value={responseData.ipInfo.hostname} />
                    <InfoItem label="Ciudad" value={responseData.ipInfo.city} />
                    <InfoItem label="Región" value={responseData.ipInfo.region} />
                    <InfoItem label="País" value={responseData.ipInfo.country} />
                    <InfoItem label="Código Postal" value={responseData.ipInfo.postal} />
                    <InfoItem label="Ubicación" value={responseData.ipInfo.loc} />
                    <InfoItem label="Zona Horaria" value={responseData.ipInfo.timezone} />
                  </InfoCard>
                </Grid>

                <Grid item xs={12} md={6}>
                  <InfoCard title="Sistema" icon={<Computer fontSize="medium" />} delay={200}>
                    <InfoItem label="User Agent" value={responseData.clientData.userAgent} />
                    <InfoItem label="Plataforma" value={responseData.clientData.platform} />
                    <InfoItem label="Idioma" value={responseData.clientData.language} />
                    <InfoItem label="Orientación" value={responseData.clientData.orientation} />
                    <InfoItem label="Profundidad de Color" value={`${responseData.clientData.colorDepth} bits`} />
                  </InfoCard>
                </Grid>

                <Grid item xs={12} md={6}>
                  <InfoCard title="Pantalla" icon={<Smartphone fontSize="medium" />} delay={300}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 2,
                        p: 2,
                        backgroundColor: `${theme.primary}15`,
                        borderRadius: "8px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: theme.text,
                          mb: 1,
                        }}
                      >
                        Dimensiones de pantalla
                      </Typography>

                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          maxWidth: "200px",
                          height: "120px",
                          border: `2px solid ${theme.primary}`,
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: `${theme.primary}10`,
                        }}
                      >
                        <Typography variant="body2" sx={{ color: theme.text }}>
                          {responseData.clientData.screenWidth} × {responseData.clientData.screenHeight}
                        </Typography>

                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: `${(responseData.clientData.windowWidth / responseData.clientData.screenWidth) * 100}%`,
                            height: `${(responseData.clientData.windowHeight / responseData.clientData.screenHeight) * 100}%`,
                            minWidth: "30%",
                            minHeight: "30%",
                            border: `2px dashed ${theme.primary}`,
                            borderRadius: "4px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: `${theme.primary}20`,
                          }}
                        >
                          <Typography variant="caption" sx={{ color: theme.text, fontSize: "0.6rem" }}>
                           
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <InfoItem label="Ancho de Pantalla" value={`${responseData.clientData.screenWidth}px`} />
                    <InfoItem label="Alto de Pantalla" value={`${responseData.clientData.screenHeight}px`} />
                    <InfoItem label="Ancho de Ventana" value={`${responseData.clientData.windowWidth}px`} />
                    <InfoItem label="Alto de Ventana" value={`${responseData.clientData.windowHeight}px`} />
                  </InfoCard>
                </Grid>

                <Grid item xs={12} md={6}>
                  <InfoCard title="Tiempo" icon={<AccessTime fontSize="medium" />} delay={400}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 2,
                        p: 3,
                        backgroundColor: `${theme.primary}15`,
                        borderRadius: "8px",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: theme.text,
                          mb: 1,
                        }}
                      >
                        Fecha y hora de consulta
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          color: theme.primary,
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        {formatDate(responseData.clientData.timestamp)}
                      </Typography>
                    </Box>

                    <InfoItem label="Zona Horaria" value={responseData.ipInfo.timezone || "No disponible"} />

                    <InfoItem label="Timestamp" value={responseData.clientData.timestamp} />
                  </InfoCard>
                </Grid>
              </Grid>
            </Box>
          )
        )}

        <Box
          sx={{
            mt: 6,
            pt: 2,
            borderTop: `1px solid ${theme.divider}`,
            textAlign: "center",
            color: theme.secondaryText,
          }}
        >
          <Typography variant="body2">IP Info Dashboard © {new Date().getFullYear()}</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default IPDashboard

