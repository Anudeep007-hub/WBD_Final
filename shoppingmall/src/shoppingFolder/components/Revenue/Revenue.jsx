import React, { useState, useEffect } from "react";
import "../css/BookingDetails.css"; // Import a separate CSS file for styling
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend as PieLegend } from "recharts";
import { LineChart, Line } from "recharts";

const BookingDetails = () => {
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user email
                const emailResponse = await fetch(`${process.env.REACT_APP_API_URL}/user_get_mail`);
                if (!emailResponse.ok) throw new Error("Failed to fetch email.");
                const emailData = await emailResponse.json();
                const userEmail = emailData.mail;
                setEmail(userEmail);

                // Fetch user bookings
                const userBookingsResponse = await fetch(`${process.env.REACT_APP_API_URL}/get_user_bookings`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: userEmail }),
                });

                if (!userBookingsResponse.ok) throw new Error("Failed to fetch user bookings.");
                const userBookingsData = await userBookingsResponse.json();
                setUserBookings(userBookingsData.bookings);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate total revenue from sports bookings
    const totalSportsRevenue = userBookings.reduce((total, booking) => total + (booking.cost || 0), 0);

    // Data for the Pie Chart - Distribute revenue by label
    const pieData = userBookings.map(booking => ({
        name: booking.label,
        value: booking.cost || 0
    }));

    // Data for the Line Chart - Trend of revenue over time
    const lineChartData = userBookings.map(booking => ({
        date: new Date(booking.date).toLocaleDateString(),
        revenue: booking.cost || 0
    }));

    // Data for the Bar Chart (Revenue comparison)
    const revenueData = [
        { name: "Sports", revenue: totalSportsRevenue }
    ];

    return (
        <div className="booking-details-container">
            {loading ? (
                <p>Loading bookings...</p>
            ) : (
                <>
                    {/* Top Row: Bar Chart and Pie Chart */}
                    <div className="charts-row">
                        <div className="chart-container">
                            <h4>Total Revenue from Sports Bookings (Bar Chart)</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="chart-container">
                            <h4>Revenue Distribution by Label (Pie Chart)</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={120}
                                        fill="#8884d8"
                                        label
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                                        ))}
                                    </Pie>
                                    <PieLegend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bottom Row: Line Chart and Revenue Table */}
                    <div className="charts-row">
                        <div className="chart-container">
                            <h4>Revenue Trend over Time (Line Chart)</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineChartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="chart-container">
                            <h4>Revenue Breakdown Table</h4>
                            <table className="revenue-table">
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Cost (₹)</th>
                                        <th>Transaction Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userBookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td>{booking.label}</td>
                                            <td>₹{booking.cost}</td>
                                            <td>{new Date(booking.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookingDetails;
