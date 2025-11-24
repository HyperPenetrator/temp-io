import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer, Clock, Calendar, Compass, Gauge, Eye, CloudDrizzle, Loader } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const getWeatherIcon = (code) => {
    const iconMap = {
        0: Sun, 1: Sun, 2: Cloud, 3: Cloud,
        45: CloudDrizzle, 48: CloudDrizzle,
        51: CloudDrizzle, 53: CloudDrizzle, 55: CloudDrizzle,
        61: CloudRain, 63: CloudRain, 65: CloudRain,
        71: CloudSnow, 73: CloudSnow, 75: CloudSnow,
        95: CloudLightning, 96: CloudLightning, 99: CloudLightning
    };
    return iconMap[code] || Cloud;
};

const getWeatherDescription = (code) => {
    const descriptions = {
        0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
        45: 'Foggy', 48: 'Rime Fog',
        51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
        61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
        71: 'Slight Snow', 73: 'Moderate Snow', 75: 'Heavy Snow',
        95: 'Thunderstorm', 96: 'Thunderstorm with Hail', 99: 'Severe Thunderstorm'
    };
    return descriptions[code] || 'Unknown';
};

const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
};

const MetricCard = ({ icon: Icon, label, value, unit, color, delay = 0, subtitle }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ scale: 1.05, y: -4 }}
        className="glass-panel"
        style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            background: `linear-gradient(135deg, ${color}10, ${color}05)`,
            border: `1px solid ${color}30`,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'default'
        }}
    >
        {/* Glow Effect */}
        <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '100px',
            height: '100px',
            background: `radial-gradient(circle, ${color}20, transparent)`,
            filter: 'blur(30px)',
            pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {label}
                </span>
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Icon size={20} color={color} strokeWidth={2.5} />
                </motion.div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color, lineHeight: 1 }}>
                    {value}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: `${color}80` }}>
                    {unit}
                </span>
            </div>
            {subtitle && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', margin: 0 }}>
                    {subtitle}
                </p>
            )}
        </div>
    </motion.div>
);

const WeatherCard = ({ data, loading, error, localTime }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel"
                style={{
                    padding: 'var(--spacing-xl)',
                    borderRadius: 'var(--radius-xl)',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(129, 140, 248, 0.08))'
                }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={{ display: 'inline-block', marginBottom: '16px' }}
                >
                    <Loader size={48} color="var(--color-accent-primary)" strokeWidth={2.5} />
                </motion.div>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    Fetching weather data...
                </p>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{
                    padding: 'var(--spacing-xl)',
                    borderRadius: 'var(--radius-xl)',
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
            >
                <p style={{ color: 'var(--color-accent-danger)', fontSize: '1.1rem', fontWeight: '600', textAlign: 'center' }}>
                    ⚠️ {error}
                </p>
            </motion.div>
        );
    }

    if (!data) return null;

    const WeatherIcon = getWeatherIcon(data.weathercode);
    const weatherDesc = getWeatherDescription(data.weathercode);
    const windDir = getWindDirection(data.winddirection || 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel"
            style={{
                padding: 'var(--spacing-xl)',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(192, 132, 252, 0.08))',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated Background Orbs */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15), transparent)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                animation: 'float 8s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-100px',
                left: '-100px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(192, 132, 252, 0.15), transparent)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                animation: 'float 10s ease-in-out infinite reverse'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Location Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: 'var(--spacing-lg)' }}
                >
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        marginBottom: '8px',
                        background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-tertiary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <Compass size={28} color="var(--color-accent-primary)" />
                        {data.location}
                    </h2>

                    {/* Date and Time */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calendar size={16} color="var(--text-muted)" />
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                {format(currentTime, 'EEEE, MMMM d, yyyy')}
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Clock size={16} color="var(--text-muted)" />
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                {format(currentTime, 'h:mm:ss a')}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Weather Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--spacing-lg)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--spacing-lg)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            style={{ display: 'inline-block', marginBottom: '12px' }}
                        >
                            <WeatherIcon size={80} color="var(--color-accent-primary)" strokeWidth={1.5} />
                        </motion.div>
                        <p style={{
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            color: 'var(--text-secondary)',
                            margin: 0
                        }}>
                            {weatherDesc}
                        </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                        >
                            <span style={{
                                fontSize: '5rem',
                                fontWeight: '900',
                                lineHeight: 1,
                                background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                {Math.round(data.temperature_c)}
                            </span>
                            <span style={{
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                color: 'var(--color-accent-primary)',
                                marginTop: '8px'
                            }}>
                                °C
                            </span>
                        </motion.div>
                        <p style={{
                            fontSize: '1rem',
                            color: 'var(--text-muted)',
                            marginTop: '8px',
                            fontWeight: '500'
                        }}>
                            Feels like {Math.round(data.feels_like_c)}°C
                        </p>
                    </div>
                </motion.div>

                {/* Metrics Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '12px'
                }}>
                    <MetricCard
                        icon={Thermometer}
                        label="Feels Like"
                        value={Math.round(data.feels_like_c)}
                        unit="°C"
                        color="var(--color-accent-warning)"
                        delay={0.3}
                    />
                    <MetricCard
                        icon={Droplets}
                        label="Humidity"
                        value={data.humidity}
                        unit="%"
                        color="var(--color-accent-primary)"
                        delay={0.35}
                    />
                    <MetricCard
                        icon={Wind}
                        label="Wind Speed"
                        value={Math.round(data.windspeed_kph)}
                        unit="km/h"
                        color="var(--color-accent-secondary)"
                        delay={0.4}
                        subtitle={`${windDir} (${data.winddirection}°)`}
                    />
                    <MetricCard
                        icon={Gauge}
                        label="Pressure"
                        value={data.raw?.pressure_msl ? Math.round(data.raw.pressure_msl) : 'N/A'}
                        unit="hPa"
                        color="var(--color-accent-tertiary)"
                        delay={0.45}
                    />
                    <MetricCard
                        icon={Eye}
                        label="Cloud Cover"
                        value={data.raw?.cloud_cover || 0}
                        unit="%"
                        color="var(--text-secondary)"
                        delay={0.5}
                    />
                    <MetricCard
                        icon={CloudRain}
                        label="Precipitation"
                        value={data.precipitation || 0}
                        unit="mm"
                        color="var(--color-accent-primary)"
                        delay={0.55}
                    />
                </div>

                {/* Data Source Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{
                        marginTop: 'var(--spacing-md)',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        textAlign: 'center'
                    }}
                >
                    <p style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        margin: 0,
                        fontWeight: '500'
                    }}>
                        📡 Data from <span style={{ color: 'var(--color-accent-primary)', fontWeight: '600' }}>Open-Meteo</span> • Updated in real-time
                    </p>
                </motion.div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
        </motion.div>
    );
};

export default WeatherCard;
