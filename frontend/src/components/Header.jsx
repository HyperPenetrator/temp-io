import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Sparkles, TrendingUp } from 'lucide-react';

const Header = () => {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                textAlign: 'center',
                marginBottom: 'var(--spacing-2xl)',
                position: 'relative'
            }}
        >
            {/* Logo and Title */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '16px',
                position: 'relative'
            }}>
                {/* Animated Icon */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'relative',
                        filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.5))'
                    }}
                >
                    <CloudRain size={56} color="var(--color-accent-primary)" strokeWidth={2.5} />

                    {/* Sparkle Effect */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: 'absolute',
                            top: -8,
                            right: -8
                        }}
                    >
                        <Sparkles size={20} color="var(--color-accent-tertiary)" />
                    </motion.div>
                </motion.div>

                {/* Title */}
                <div>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-gradient"
                        style={{
                            fontSize: '4rem',
                            fontWeight: '900',
                            margin: 0,
                            letterSpacing: '-0.03em',
                            lineHeight: 1
                        }}
                    >
                        Temp.io
                    </motion.h1>

                    {/* Live Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '8px',
                            padding: '4px 12px',
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: 'var(--color-accent-success)'
                        }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: 'var(--color-accent-success)',
                                boxShadow: '0 0 10px var(--color-accent-success)'
                            }}
                        />
                        LIVE DATA
                    </motion.div>
                </div>

                {/* Trending Icon */}
                <motion.div
                    animate={{
                        y: [0, -8, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    style={{
                        position: 'relative',
                        filter: 'drop-shadow(0 0 15px rgba(192, 132, 252, 0.4))'
                    }}
                >
                    <TrendingUp size={40} color="var(--color-accent-tertiary)" strokeWidth={2.5} />
                </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.25rem',
                    fontWeight: '500',
                    marginBottom: '12px',
                    letterSpacing: '0.01em'
                }}
            >
                Industry-Grade Weather Intelligence for India
            </motion.p>

            {/* Features Pills */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}
            >
                {[
                    { icon: '🤖', text: 'AI-Powered', color: 'var(--color-accent-tertiary)' },
                    { icon: '⚡', text: 'Real-time', color: 'var(--color-accent-primary)' },
                    { icon: '🎯', text: '700+ Locations', color: 'var(--color-accent-secondary)' },
                    { icon: '🚨', text: 'Smart Alerts', color: 'var(--color-accent-warning)' }
                ].map((pill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            background: `linear-gradient(135deg, ${pill.color}15, ${pill.color}08)`,
                            border: `1px solid ${pill.color}40`,
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: pill.color,
                            cursor: 'default',
                            transition: 'all var(--transition-base)'
                        }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>{pill.icon}</span>
                        {pill.text}
                    </motion.div>
                ))}
            </motion.div>

            {/* Decorative Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--color-accent-primary), var(--color-accent-tertiary), transparent)',
                    marginTop: 'var(--spacing-lg)',
                    borderRadius: '2px',
                    maxWidth: '600px',
                    margin: 'var(--spacing-lg) auto 0'
                }}
            />
        </motion.header>
    );
};

export default Header;
