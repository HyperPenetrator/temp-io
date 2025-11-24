import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Loader } from 'lucide-react';
import indianStates from '../data/indianStates.json';

const LocationSearch = ({ onSearch }) => {
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state) return;

        setLoading(true);
        await onSearch({ state, district });
        setTimeout(() => setLoading(false), 500);
    };

    const selectedState = indianStates.find(s => s.state === state);
    const districts = selectedState?.districts || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel"
            style={{
                padding: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-lg)',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(129, 140, 248, 0.08))',
                position: 'relative',
                overflow: 'visible'
            }}
        >
            {/* Glow Effect */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15), transparent)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <MapPin size={24} color="var(--color-accent-primary)" />
                        </motion.div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            margin: 0,
                            background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Search Location
                        </h3>
                    </div>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        margin: 0
                    }}>
                        Get real-time weather for any district in India
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--spacing-md)',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        {/* State Select */}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                State / UT
                            </label>
                            <motion.select
                                whileFocus={{ scale: 1.01 }}
                                value={state}
                                onChange={(e) => {
                                    setState(e.target.value);
                                    setDistrict('');
                                }}
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '2px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-base)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-accent-primary)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(56, 189, 248, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--glass-border)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                <option value="" style={{ background: '#1e1b4b', color: '#fff' }}>
                                    Select State
                                </option>
                                {indianStates.map((s) => (
                                    <option key={s.state} value={s.state} style={{ background: '#1e1b4b', color: '#fff' }}>
                                        {s.state}
                                    </option>
                                ))}
                            </motion.select>
                        </div>

                        {/* District Select */}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                District (Optional)
                            </label>
                            <motion.select
                                whileFocus={{ scale: 1.01 }}
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                disabled={!state}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '2px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    cursor: state ? 'pointer' : 'not-allowed',
                                    opacity: state ? 1 : 0.5,
                                    transition: 'all var(--transition-base)'
                                }}
                                onFocus={(e) => {
                                    if (state) {
                                        e.target.style.borderColor = 'var(--color-accent-secondary)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(129, 140, 248, 0.1)';
                                    }
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--glass-border)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                <option value="" style={{ background: '#1e1b4b', color: '#fff' }}>
                                    All Districts
                                </option>
                                {districts.map((d) => (
                                    <option key={d} value={d} style={{ background: '#1e1b4b', color: '#fff' }}>
                                        {d}
                                    </option>
                                ))}
                            </motion.select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <motion.button
                        type="submit"
                        disabled={!state || loading}
                        whileHover={{ scale: state && !loading ? 1.02 : 1 }}
                        whileTap={{ scale: state && !loading ? 0.98 : 1 }}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: state && !loading
                                ? 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))'
                                : 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            color: '#fff',
                            fontSize: '1.05rem',
                            fontWeight: '700',
                            cursor: state && !loading ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'all var(--transition-base)',
                            boxShadow: state && !loading ? '0 4px 20px rgba(56, 189, 248, 0.3)' : 'none',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Button Shine Effect */}
                        {state && !loading && (
                            <motion.div
                                animate={{
                                    x: ['-100%', '200%']
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '50%',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                    transform: 'skewX(-20deg)'
                                }}
                            />
                        )}

                        <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {loading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Loader size={20} />
                                    </motion.div>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search size={20} />
                                    Get Weather Forecast
                                </>
                            )}
                        </span>
                    </motion.button>
                </form>

                {/* Quick Access */}
                {!state && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ marginTop: 'var(--spacing-md)' }}
                    >
                        <p style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            marginBottom: '8px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Quick Access
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {[
                                { state: 'Delhi', district: 'New Delhi' },
                                { state: 'Maharashtra', district: 'Mumbai' },
                                { state: 'Karnataka', district: 'Bengaluru' },
                                { state: 'Tamil Nadu', district: 'Chennai' }
                            ].map((loc, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setState(loc.state);
                                        setDistrict(loc.district);
                                        setTimeout(() => onSearch(loc), 100);
                                    }}
                                    style={{
                                        padding: '6px 12px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-sm)',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-base)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'rgba(56, 189, 248, 0.1)';
                                        e.target.style.borderColor = 'var(--color-accent-primary)';
                                        e.target.style.color = 'var(--color-accent-primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.target.style.borderColor = 'var(--glass-border)';
                                        e.target.style.color = 'var(--text-secondary)';
                                    }}
                                >
                                    {loc.district}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default LocationSearch;
