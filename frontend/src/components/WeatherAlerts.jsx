import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const WeatherAlerts = ({ weatherData }) => {
    if (!weatherData) return null;

    const alerts = [];
    const temp = weatherData.temperature_c || 0;
    const humidity = weatherData.humidity || 0;
    const windspeed = weatherData.windspeed_kph || 0;
    const precipitation = weatherData.precipitation || 0;

    // Temperature alerts
    if (temp > 40) {
        alerts.push({
            type: 'danger',
            icon: AlertTriangle,
            title: 'Extreme Heat Warning',
            message: 'Temperature exceeds 40°C. Stay indoors, stay hydrated, and avoid direct sunlight.',
            color: '#ef4444'
        });
    } else if (temp > 35) {
        alerts.push({
            type: 'warning',
            icon: AlertTriangle,
            title: 'Heat Advisory',
            message: 'High temperature detected. Limit outdoor activities and drink plenty of water.',
            color: '#f59e0b'
        });
    } else if (temp < 5) {
        alerts.push({
            type: 'warning',
            icon: AlertTriangle,
            title: 'Cold Weather Alert',
            message: 'Very cold conditions. Dress warmly and protect exposed skin.',
            color: '#3b82f6'
        });
    }

    // Wind alerts
    if (windspeed > 40) {
        alerts.push({
            type: 'danger',
            icon: AlertTriangle,
            title: 'High Wind Warning',
            message: 'Strong winds detected. Secure loose objects and avoid outdoor activities.',
            color: '#ef4444'
        });
    } else if (windspeed > 25) {
        alerts.push({
            type: 'info',
            icon: Info,
            title: 'Windy Conditions',
            message: 'Moderate winds expected. Be cautious with outdoor items.',
            color: '#3b82f6'
        });
    }

    // Humidity alerts
    if (humidity > 85) {
        alerts.push({
            type: 'info',
            icon: Info,
            title: 'High Humidity',
            message: 'Very humid conditions. Wear breathable clothing and stay cool.',
            color: '#06b6d4'
        });
    }

    // Precipitation alerts
    if (precipitation > 10) {
        alerts.push({
            type: 'warning',
            icon: AlertTriangle,
            title: 'Heavy Rain',
            message: 'Significant rainfall detected. Carry umbrella and avoid flood-prone areas.',
            color: '#0ea5e9'
        });
    }

    // Good weather
    if (alerts.length === 0 && temp >= 20 && temp <= 30 && windspeed < 20 && precipitation === 0) {
        alerts.push({
            type: 'success',
            icon: CheckCircle,
            title: 'Perfect Weather',
            message: 'Ideal conditions for outdoor activities. Enjoy your day!',
            color: '#10b981'
        });
    }

    if (alerts.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginTop: 'var(--spacing-lg)' }}
        >
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={20} color="var(--color-accent-tertiary)" />
                Weather Alerts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {alerts.map((alert, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel"
                        style={{
                            padding: '16px',
                            borderRadius: '12px',
                            borderLeft: `4px solid ${alert.color}`,
                            background: `linear-gradient(135deg, ${alert.color}15, ${alert.color}05)`
                        }}
                    >
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <alert.icon size={20} color={alert.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px', color: alert.color }}>
                                    {alert.title}
                                </h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                                    {alert.message}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default WeatherAlerts;
