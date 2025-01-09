import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchHouseById } from '../../services/houseService'
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material'

const HouseDetails = () => {
    const [houseDetails, setHouseDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const getOneHouse = async () => {
            try {
                const response = await fetchHouseById(id)
                setHouseDetails(response)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch house details')
                setLoading(false)
            }
        }

        getOneHouse()
    }, [id])

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        )
    }

    if (!houseDetails) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6" color="textSecondary">
                    No house details available
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                House number: {houseDetails.house_number}
            </Typography>

            <Card sx={{ boxShadow: 3, marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        <strong>Location:</strong> {houseDetails.house_location}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>Rent:</strong> Ksh.{houseDetails.house_price}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>Type:</strong> {houseDetails.house_type === 1 ? 'Residential' : 'Cormecial' }
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <strong>Occupied:</strong> {houseDetails.occupied === true ? 'Yes' : 'No' }
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default HouseDetails
